import { Hono } from "hono";
import { getCookie } from "hono/cookie";
import loginDspace from "../utils/login-dspace";
import { postMetadata, createWorkspaceItems } from "../utils/post-metadata";
import fs from "node:fs";
import { jenjang } from "../utils/jenjang";
import { BlankInput } from "hono/types";

const baseUrl = process.env.DSPACE_URL as string;

const api = new Hono();

api.get("/", async (c) => {
  const fetchServerToken = await fetch(baseUrl);
  const { dspaceServer, dspaceVersion } = await fetchServerToken.json();
  console.log(dspaceServer, dspaceVersion);
  return c.json({
    apiName: "Unggah Mandiri ETD Unpad",
    developer: "Chrisna Adhi Pranoto",
    info: "Please login via /api/unggah-mandiri/login. Check login status in /api/unggah-mandiri/status.",
  });
});

api
  .use(async (c, next) => {
    const tryLogin = await loginDspace(c);

    //@ts-expect-error
    c.set("dspace", tryLogin?.dspaceCookie);
    //@ts-expect-error
    c.set("token", tryLogin?.dspaceToken);

    await next();
  })
  .get("/login", async (c) => {
    const cookie = getCookie(c);

    return c.json({
      status: "logged in",
      cookie,
    });
  });

api.get("/status", async (c) => {
  const cookie = getCookie(c);

  const getAuth = await fetch(baseUrl + "/authn/status", {
    method: "GET",
    credentials: "include",
    headers: new Headers({
      Accept: "*/*",
      Authorization: "Bearer " + cookie.token,
      "X-XSRF-TOKEN": cookie.dspace ?? "",
      Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
      "Content-Type": "application/json",
    }),
  });

  const checkAuth = await getAuth.json();

  if (checkAuth.authenticated === true) {
    c.status(200);
    return c.json({
      apiName: "Unggah Mandiri ETD Unpad",
      developer: "Chrisna Adhi Pranoto",
      authenticated: checkAuth.authenticated,
      cookie: cookie.newdspace,
      token: cookie.token,
    });
  } else {
    c.status(403);
    return c.json({
      status: 403,
      msg: "Not Authenticated! Resend your Request to get your JWT Token.",
    });
  }
});

api.post("/", async (c) => {
  const body = await c.req.json();
  const cookie = getCookie(c);

  const getStatusLogin = await fetch(`${baseUrl}/authn/status`, {
    method: "GET",
    credentials: "include",
    headers: new Headers({
      Accept: "*/*",
      Authorization: "Bearer " + cookie.token,
      "X-XSRF-TOKEN": cookie.dspace ?? "",
      Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
      "Content-Type": "application/json",
    }),
  });
  const checkStatus = await getStatusLogin.json();

  const { npm } = body.result.metadata;

  if (!fs.existsSync(`./tmp/${npm}`)) {
    fs.mkdirSync(`./tmp/${npm}`, { recursive: true });
    console.log("Temporary Folder Created!");
  }

  const cookieValue = {
    token: cookie.token,
    dspace: cookie.newdspace,
  };

  let workspaceNumber = "";
  let uid = "";

  if (cookieValue.dspace && checkStatus.authenticated === true) {
    const getCollection = jenjang.find(
      (item) => item.kodeProdi === Number(body.result.metadata.kodeProdi)
    );
    console.log(cookie.dspace);
    const createItem = await createWorkspaceItems(
      cookieValue,
      getCollection?.owningCollection
    );

    workspaceNumber = createItem.workspaceid;
    uid = createItem.uid;
    await postMetadata(cookieValue, body, Number(workspaceNumber));
  } else {
    console.log("cookie is not loaded");
  }

  return c.json({
    npm,
    workspaceItem: workspaceNumber,
    workspaceId: uid,
    status:
      "Please wait around 1 minutes for background processing to upload the file to DSpace Server",
  });
});

export default api;
