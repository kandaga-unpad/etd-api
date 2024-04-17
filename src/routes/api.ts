// Core Import
import { Hono } from "hono";
import { cors } from "hono/cors";

// Drizzle Import
import { db } from "../database/drizzle";
import * as schema from "../database/schema";
import { and, asc, count, eq, like } from "drizzle-orm";

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
  let metadataList: Record<string, any> = [];
  let pembimbingList: Record<string, any> = [];
  let pengujiList: Record<string, any> = [];

  metadataList = await db
    .select()
    .from(schema.aEtdMetadata)
    .where(eq(schema.aEtdMetadata.npm, npm));

  pembimbingList = await db
    .select()
    .from(schema.aEtdPembimbing)
    .where(eq(schema.aEtdPembimbing.npm, npm));
  pengujiList = await db
    .select()
    .from(schema.aEtdPenguji)
    .where(eq(schema.aEtdPenguji.npm, npm));

  const result = {
    metadata: metadataList[0],
    pembimbing: pembimbingList,
    penguji: pengujiList,
  };
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
  let results: Record<string, any> = [];

  if (page !== undefined && tahun !== undefined && jenjang !== undefined) {
    results = await db
      .select({
        npm: schema.aEtdMetadata.npm,
        author: schema.aEtdMetadata.author,
        jenjang: schema.aEtdMetadata.jenjang,
        jenis: schema.aEtdMetadata.jenis,
        kodeProdi: schema.aEtdMetadata.kodeProdi,
        prodi: schema.aEtdMetadata.programStudi,
        fakultas: schema.aEtdMetadata.fakultas,
        status: schema.aEtdMetadata.status,
        tahun: schema.aEtdMetadata.tahun,
      })
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
      .select({
        npm: schema.aEtdMetadata.npm,
        author: schema.aEtdMetadata.author,
        jenjang: schema.aEtdMetadata.jenjang,
        jenis: schema.aEtdMetadata.jenis,
        kodeProdi: schema.aEtdMetadata.kodeProdi,
        prodi: schema.aEtdMetadata.programStudi,
        fakultas: schema.aEtdMetadata.fakultas,
        status: schema.aEtdMetadata.status,
        tahun: schema.aEtdMetadata.tahun,
      })
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
  const jenjang = c.req.query("jenjang");

  let results: Record<string, any> = [];
  const numberResults = await db
    .select({ count: count() })
    .from(schema.aEtdMetadata)
    .where(eq(schema.aEtdMetadata.kodeProdi, kode));
  const fakultas = objFakultas.find((fak) => {
    return kode.startsWith(String(fak.id));
  });

  if (page !== undefined && limit !== undefined) {
    results = await db
      .select({
        npm: schema.aEtdMetadata.npm,
        author: schema.aEtdMetadata.author,
        jenjang: schema.aEtdMetadata.jenjang,
        jenis: schema.aEtdMetadata.jenis,
        kodeProdi: schema.aEtdMetadata.kodeProdi,
        prodi: schema.aEtdMetadata.programStudi,
        fakultas: schema.aEtdMetadata.fakultas,
        status: schema.aEtdMetadata.status,
        tahun: schema.aEtdMetadata.tahun,
      })
      .from(schema.aEtdMetadata)
      .where(and(eq(schema.aEtdMetadata.kodeProdi, kode)))
      .limit(Number(limit))
      .offset(Number(page))
      .orderBy(asc(schema.aEtdMetadata.npm));
  } else {
    console.log(results);
  }

  return c.json({
    jenjang: results[0].jenjang,
    fakultas: fakultas?.namaFakultas,
    total: numberResults[0].count,
    page,
    limit,
    results: results?.length > 0 ? results : "Not Found",
  });
});

export default api;
