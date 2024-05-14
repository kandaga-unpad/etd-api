import fs from "node:fs";

async function createBlobFromFile(path: string) {
  const file = fs.readFileSync(path);
  return new Blob([file]);
}

export const uploadFiles = async (
  baseUrl: any,
  fileList: any[],
  cookie: { token: string; dspace: string },
  itemId: any,
  npmMhs: any
) => {
  if (fileList.length > 0) {
    for (const [index, file] of fileList.entries()) {
      if (fs.existsSync(`./tmp/${npmMhs}/${file}`)) {
        const formData = new FormData();

        let accessData = "";

        if (
          file.includes("Cover") ||
          file.includes("Abstrak") ||
          file.includes("DaftarIsi") ||
          file.includes("Bab1") ||
          file.includes("Pustaka") ||
          file.includes("Bab1") ||
          file.includes("Pengesahan")
        ) {
          accessData = "Open";
        } else if (
          file.includes("Bab2") ||
          file.includes("Bab3") ||
          file.includes("Bab4") ||
          file.includes("Bab5") ||
          file.includes("Bab6") ||
          file.includes("Lampiran") ||
          file.includes("Surat")
        ) {
          accessData = "Close";
        } else {
          console.log("Seems like nothing chosen");
          accessData = "Close";
        }

        const path = `./tmp/${npmMhs}/${file}`;
        formData.append("file", await createBlobFromFile(path), file);

        await fetch(`${baseUrl}/submission/workspaceitems/${itemId}`, {
          method: "POST",
          credentials: "include",
          headers: new Headers({
            Accept: "*/*",
            Authorization: "Bearer " + cookie.token,
            "X-XSRF-TOKEN": cookie.dspace,
            Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
          }),
          body: formData,
        }).then(async (res) => {
          if (res.ok) {
            console.log("AccessData: " + accessData);
            console.log("Index: " + index);
            await fetch(`${baseUrl}/submission/workspaceitems/${itemId}`, {
              method: "PATCH",
              credentials: "include",
              headers: new Headers({
                Accept: "*/*",
                Authorization: "Bearer " + cookie.token,
                "X-XSRF-TOKEN": cookie.dspace,
                "Content-Type": "application/json",
                Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
              }),
              body: `[{ "op": "add", "path": "/sections/upload/files/${index}/accessConditions/-", "value": {"name": "${
                accessData === "Close" ? "administrator" : "anonymous"
              }"}}]`,
            }).then((res) => {
              console.log("status file :" + res.ok);
              return res;
            });
          } else {
            console.log("error on upload files");
          }
        });
      }
    }
  }
};
