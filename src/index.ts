import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { prettyJSON } from "hono/pretty-json";
import api from "./routes/api";
const app = new Hono();

app.use("*", prettyJSON());

app.get("/", (c) => {
  return c.json({
    app: "ETD API Unpad",
    dev: "Kandaga Unpad",
  });
});

app.route("/api", api);

const port = 4233;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});
