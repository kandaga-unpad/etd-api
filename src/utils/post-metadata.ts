import fs from "node:fs";
import { uploadMetadataValue } from "./upload-metadata";
import { uploadFiles } from "./upload-files";
import { rimraf, rimrafSync } from "rimraf";

const baseUrl = process.env.DSPACE_URL as string;

async function downloadFile(
  file: string,
  objName: string,
  path: string,
  metadata: any
) {
  const fileName = `${
    metadata.jenjang === "Sarjana"
      ? "S1"
      : metadata.jenjang === "Magister"
      ? "S2"
      : metadata.jenjang === "Doktor"
      ? "S3"
      : metadata.jenjang === "Spesialis-1"
      ? "SPESIALIS"
      : metadata.jenjang === "Subspesialis"
      ? "SUBSPESIALIS"
      : metadata.jenjang === "Diploma III"
      ? "DIPLOMA"
      : metadata.jenjang === "Diploma IV"
      ? "DIPLOMA"
      : "Unpad"
  }-${metadata.tahun}-${metadata.npm}-${objName.replace("file", "")}.pdf`;

  const buildUrl = metadata.linkPath + file;
  const getFile = await fetch(buildUrl);

  if (getFile.ok && getFile.body) {
    console.log("Writing to file: ", fileName);
    const downloadWriteStream = fs.createWriteStream(`${path}/${fileName}`);
    const stream = new WritableStream({
      write(chunk) {
        downloadWriteStream.write(chunk);
      },
    });
    const body = getFile.body;
    await body.pipeTo(stream);
    console.log(`File ${fileName} downloaded to ${path}`);
  }

  return fileName;
}

async function createWorkspaceItems(
  cookie: { token: string; dspace: string },
  collection: string | undefined
) {
  const getCollection = await fetch(
    `${baseUrl}/submission/workspaceitems?owningCollection=` +
      String(collection),
    {
      method: "POST",
      headers: new Headers({
        Accept: "*/*",
        Authorization: "Bearer " + cookie.token,
        "X-XSRF-TOKEN": cookie.dspace,
        "Content-Type": "application/json",
        Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
      }),
    }
  );

  const response = await getCollection.json();

  return {
    workspaceid: response?.id,
    uid: response?._embedded.item.id,
  };
}

async function postMetadata(
  cookie: { token: string; dspace: string },
  object: Record<string, any>,
  itemId: number
) {
  const individualData = object.result.metadata;
  const pembimbing = object.result.pembimbing;

  let splitKeyword: Object[] = [];
  let pembimbingValue: Object[] = [];

  individualData.keywords.split(",").forEach((item: string) => {
    splitKeyword.push({
      value: item,
      language: "id_ID",
      authority: null,
      confidence: -1,
    });
  });

  pembimbing.forEach((item: Record<string, any>) => {
    pembimbingValue.push({
      value: item.namaDosen,
      language: "id_ID",
      authority: null,
      confidence: -1,
    });
  });

  const addingMetadata = {
    author: {
      path: "/sections/traditionalpageone/dc.contributor.author",
      value: [
        {
          value: individualData.author,
          language: "id_ID",
          authority: null,
          confidence: -1,
        },
      ],
    },
    title: {
      path: "/sections/traditionalpageone/dc.title",
      value: [
        {
          value: individualData.title,
          language: "id_ID",
          authority: null,
          confidence: -1,
        },
      ],
    },
    abstract: {
      path: "/sections/traditionalpagetwo/dc.description.abstract",
      value: [
        {
          value: individualData.abstract,
          language: "id_ID",
          authority: null,
          confidence: -1,
        },
      ],
    },
    bahasa: {
      path: "/sections/traditionalpageone/dc.language.iso",
      value: [
        {
          value: "id",
          language: "id_ID",
          authority: null,
          confidence: -1,
        },
      ],
    },
    subject: {
      path: "/sections/traditionalpagetwo/dc.subject",
      value: splitKeyword,
    },
    issued: {
      path: "/sections/traditionalpageone/dc.date.issued",
      value: [
        {
          value: individualData.tglUpload.split(" ").at(0),
          language: "id_ID",
          authority: null,
          confidence: -1,
        },
      ],
    },
    advisor: {
      path: "/sections/traditionalpageone/dc.contributor.advisor",
      value: pembimbingValue,
    },
    handle: {
      path: "/sections/traditionalpageone/dc.identifier.uri",
      value: [
        {
          value: `https://repository.unpad.ac.id/handle/kandaga/${individualData.npm}`,
          language: "id_ID",
          authority: null,
          confidence: -1,
        },
      ],
    },
  };

  await uploadMetadataValue(addingMetadata, itemId, cookie).then(async () => {
    await fetch(`${baseUrl}/submission/workspaceitems/${itemId}`, {
      method: "PATCH",
      credentials: "include",
      headers: new Headers({
        Accept: "*/*",
        Authorization: "Bearer " + cookie.token,
        "X-XSRF-TOKEN": cookie.dspace ?? "",
        Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
        "Content-Type": "application/json",
      }),
      body: `[{ "op": "add", "path": "/sections/license/granted", "value": true}]`,
    });
  });

  let fileList: any[] = [];

  for (const listData in individualData) {
    if (listData.includes("file")) {
      if (individualData[listData] !== null) {
        const fileName = await downloadFile(
          individualData[listData],
          listData,
          `./tmp/${individualData.npm}`,
          individualData
        );
        if (fileName) {
          fileList.push(fileName);
        }
      }
    }
  }

  const getMetadataRepo = await fetch(
    baseUrl + `/submission/workspaceitems/${itemId}`,
    {
      method: "GET",
      credentials: "include",
      headers: new Headers({
        Accept: "*/*",
        Authorization: "Bearer " + cookie.token,
        "X-XSRF-TOKEN": cookie.dspace ?? "",
        Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
        "Content-Type": "application/json",
      }),
    }
  );
  const getData = await getMetadataRepo.json();

  if (getData) {
    setTimeout(async () => {
      await uploadFiles(
        baseUrl,
        fileList,
        cookie,
        itemId,
        individualData.npm
      ).then(async () => {
        await fetch(`${baseUrl}/workflow/workflowitems`, {
          method: "POST",
          credentials: "include",
          headers: new Headers({
            Accept: "*/*",
            Authorization: "Bearer " + cookie.token,
            "X-XSRF-TOKEN": cookie.dspace ?? "",
            Cookie: "DSPACE-XSRF-COOKIE=" + cookie.dspace,
            "Content-Type": "text/uri-list",
          }),
          body: `${baseUrl}/submission/workspaceitems/${itemId}`,
        })
          .then(async (res) => {
            console.log("Prepare to Delete tmp Folder...");
            return res.ok ? console.log("Uploaded!") : console.log(res.status);
          })
          .finally(() => {
            try {
              if (process.platform === "win32") {
                rimraf.windowsSync(`./tmp/${individualData.npm}`);
              } else if (process.platform === "linux") {
                rimrafSync(`./tmp/${individualData.npm}`);
              }

              console.log("Temporary Folder Deleted!");
            } catch (error) {
              console.log("Error : " + error);
            }
          });
      });
    }, 10000);
  }
}

export { postMetadata, createWorkspaceItems };
