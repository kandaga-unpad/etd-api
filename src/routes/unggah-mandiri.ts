import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import login from "../utils/login-dspace";
import fs from "fs";

const api = new Hono();

api.get("/", (c) => {
  return c.json({
    apiName: "Unggah Mandiri ETD Unpad",
    developer: "Chrisna Adhi Pranoto",
    purposes: "Self Upload to Repository Kandaga (DSpace)",
  });
});

api.post("/", async (c) => {
  // fs.mkdirSync("./tmp/how", { recursive: true });
  // console.log("Created!");

  // fs.rmdirSync("./tmp/how");
  // console.log("Deleted!");
  const body = await c.req.json();
  const cookie = getCookie(c);

  await login(c);

  const getFileMetadata = await fetch(
    "https://repository.unpad.ac.id/server/api/core/items",
    {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Authorization: "Bearer " + cookie.token,
        "X-XSRF-TOKEN": cookie.dspace,
      }),
    }
  );
  const results = await getFileMetadata.json();

  console.log(results);

  const { npm } = body.result.metadata;

  return c.json({
    npm,
    cookie: cookie,
  });
});

export default api;
