// Core Import
import { Hono } from "hono";
import { cors } from "hono/cors";

// Drizzle Import
import { db } from "../database/drizzle";
import * as schema from "../database/schema";
import { and, asc, eq } from "drizzle-orm";

// Utils Import
import { objFakultas } from "../utils";

const api = new Hono();
api.use("/api/*", cors());

api.get("/", (c) => {
  return c.json({
    apiName: "ETD Unpad API",
    developer: "Chrisna Adhi Pranoto",
    purposes: "Migrate Local Repository File to DSpace",
  });
});

api.get("/etd/individu/:npm", async (c) => {
  const npm = c.req.param("npm");
  const result = await db
    .select()
    .from(schema.aEtdMetadata)
    .where(eq(schema.aEtdMetadata.npm, npm));
  return c.json({
    result,
  });
});

api.get("etd/fakultas/:kode", async (c) => {
  const kode = c.req.param("kode");
  const page = c.req.query("page");
  const tahun = c.req.query("tahun");
  const jenjang = c.req.query("jenjang");

  const fakultas = objFakultas.find((fak) => {
    return fak.singkatan === kode;
  });
  let results;

  if (page !== undefined && tahun !== undefined && jenjang !== undefined) {
    results = await db
      .select()
      .from(schema.aEtdMetadata)
      .where(
        and(
          eq(schema.aEtdMetadata.fakultas, fakultas?.namaFakultas || ""),
          eq(schema.aEtdMetadata.tahun, Number(tahun)),
          eq(schema.aEtdMetadata.jenjang, jenjang)
        )
      )
      .limit(5)
      .offset(Number(page));
  } else {
    results = await db
      .select()
      .from(schema.aEtdMetadata)
      .where(eq(schema.aEtdMetadata.fakultas, fakultas?.namaFakultas || ""))
      .limit(5);
  }

  return c.json({
    fakultas,
    results,
  });
});

api.get("etd/prodi/:kode", async (c) => {
  const kode = c.req.param("kode");
  const page = c.req.query("page");
  const limit = c.req.query("limit");
  const tahun = c.req.query("tahun");
  const jenjang = c.req.query("jenjang");

  let results;

  if (
    page !== undefined &&
    tahun !== undefined &&
    jenjang !== undefined &&
    limit !== undefined
  ) {
    results = await db
      .select()
      .from(schema.aEtdMetadata)
      .where(
        and(
          eq(schema.aEtdMetadata.kodeProdi, kode),
          eq(schema.aEtdMetadata.tahun, Number(tahun)),
          eq(schema.aEtdMetadata.jenjang, jenjang)
        )
      )
      .limit(Number(limit))
      .offset(Number(page))
      .orderBy(asc(schema.aEtdMetadata.npm));
  } else if (
    jenjang === undefined &&
    page !== undefined &&
    limit !== undefined
  ) {
    results = await db
      .select()
      .from(schema.aEtdMetadata)
      .where(
        and(
          eq(schema.aEtdMetadata.kodeProdi, kode),
          eq(schema.aEtdMetadata.jenjang, jenjang!)
        )
      )
      .limit(Number(limit))
      .offset(Number(page))
      .orderBy(asc(schema.aEtdMetadata.npm));
  } else {
    results = "Not Found";
  }

  return c.json({
    results: results.length > 0 ? results : "Not Found",
  });
});

export default api;
