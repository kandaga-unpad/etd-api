import { Context, Env } from "hono";
import { getCookie, setCookie } from "hono/cookie";
import { BlankInput } from "hono/types";

export default async function loginDSpace(
  context: Context<any, any, {}> | Context<Env, "/", BlankInput>
) {
  const cookie = getCookie(context);
  if (!cookie.dspace) {
    await fetch("https://repository.unpad.ac.id/server/api", {
      method: "GET",
      credentials: "include",
    })
      .then((dspace) => {
        const getDSpaceToken = dspace.headers.get("dspace-xsrf-token");
        setCookie(context, "dspace", getDSpaceToken ?? "");
      })
      .then(async () => {
        if (!cookie.token) {
          await fetch("https://repository.unpad.ac.id/server/api/authn/login", {
            method: "POST",
            credentials: "include",
            headers: new Headers({
              Accept: "*/*",
              "X-XSRF-TOKEN": cookie.dspace,
              "Content-Type": "application/x-www-form-urlencoded",
              Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
            }),
            body: "user=perpustakaan%40unpad.ac.id&password=Kandaga2024",
          }).then((loginValue) => {
            if (loginValue.headers.get("DSPACE-XSRF-TOKEN") !== null) {
              setCookie(
                context,
                "newdspace",
                loginValue.headers.get("DSPACE-XSRF-TOKEN") ?? ""
              );
            }
            setCookie(
              context,
              "token",
              loginValue.headers.get("Authorization")?.split(" ").at(1) ?? ""
            );
          });
        }
      });
  }
}
