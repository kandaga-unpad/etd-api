import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { prettyJSON } from "hono/pretty-json";
import { swaggerUI } from "@hono/swagger-ui";

import { listProdi } from "./utils/index";

import etd from "./routes/etd";
import unggahMandiri from "./routes/unggah-mandiri";
import apiSpec from "./routes/api-spec";

const app = new Hono();

app.use("*", prettyJSON());
app.use("/*", cors());

app.get("/", (c) => {
  return c.json({
    app: "ETD API Unpad",
    dev: "Kandaga Unpad",
  });
});

app.get("/api/list-prodi", (c) => {
  return c.json({
    list: listProdi,
  });
});

app.route("/api/etd", etd);
app.route("/api/unggah-mandiri", unggahMandiri);
app.route("/api/spec", apiSpec);

// Swagger UI API Docs
app.get("/docs", swaggerUI({ url: "/api/spec" }));

const port = 4233;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
