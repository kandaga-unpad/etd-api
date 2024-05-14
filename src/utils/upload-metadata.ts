const baseUrl = process.env.DSPACE_URL;

export const uploadMetadataValue = async (
  metadataValue: Record<string, any>,
  itemId: number,
  cookie: any
) => {
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
    body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.contributor.author", "value":${JSON.stringify(
      metadataValue["author"].value
    )}}]`,
  })
    .then(async (response) => {
      console.log(await response.json());
    })
    .catch((err) => {
      console.log(err);
    });

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
    body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.title", "value":${JSON.stringify(
      metadataValue["title"].value
    )}}]`,
  })
    .then((response) => {
      console.log(response.ok);
    })
    .catch((err) => {
      console.log(err);
    });

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
    body: `[{"op": "add", "path": "/sections/traditionalpagetwo/dc.description.abstract", "value":${JSON.stringify(
      metadataValue["abstract"].value
    )}}]`,
  })
    .then((response) => {
      console.log(response.ok);
    })
    .catch((err) => {
      console.log(err);
    });

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
    body: `[{"op": "add", "path": "/sections/traditionalpagetwo/dc.subject", "value":${JSON.stringify(
      metadataValue["subject"].value
    )}}]`,
  })
    .then((response) => {
      console.log(response.ok);
    })
    .catch((err) => {
      console.log(err);
    });

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
    body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.date.issued", "value":${JSON.stringify(
      metadataValue["issued"].value
    )}}]`,
  })
    .then((response) => {
      console.log(response.ok);
    })
    .catch((err) => {
      console.log(err);
    });

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
    body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.contributor.advisor", "value":${JSON.stringify(
      metadataValue["advisor"].value
    )}}]`,
  });

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
    body: `[{"op": "add", "path": "/sections/traditionalpageone/dc.identifier.uri", "value":${JSON.stringify(
      metadataValue["handle"].value
    )}}]`,
  });
};
