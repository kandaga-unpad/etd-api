import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import { listProdi } from "./utils";

import api from "./routes/api";

const app = new Hono();

app.use("*", prettyJSON());

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

app.route("/api", api);

const port = 4233;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
