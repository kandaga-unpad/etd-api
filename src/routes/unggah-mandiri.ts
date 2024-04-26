import { Hono } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import login from "../utils/login-dspace";
import {
  postMetadata,
  createWorkspaceItems,
  dummyObject,
} from "../utils/post-metadata";
import fs from "fs";
import { jenjang } from "../utils/jenjang";

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

  const cookieValue = {
    token: cookie.token,
    dspace: cookie.dspace,
  };

  if (cookie.dspace) {
    const getCollection = jenjang.find(
      (item) => item.kodeProdi === Number(body.result.metadata.kodeProdi)
    );
    const createItem = await createWorkspaceItems(
      cookieValue,
      getCollection?.kodeProdi
    );
    console.log(createItem);
    await postMetadata(cookie.dspace, dummyObject);
  } else {
    console.log("cookie is loaded");
  }

  const { npm } = body.result.metadata;

  return c.json({
    npm,
    cookie: cookie,
  });
});

export default api;
