import { Hono } from "hono";

const api = new Hono();

api.get("/", (c) => {
  return c.json({
    swagger: "2.0",
    title: "ETD Unpad Harvesting API",
    host: "localhost:4233",
    basePath: "/api/etd",
    schemes: ["http", "https"],
    paths: {
      "/individu/{npm}": {
        get: {
          tags: ["Individual ETD"],
          summary: "Endpoint of Individual ETD",
          description:
            "Get Data of Individual ETD based on NPM of each students",
          parameters: [
            {
              name: "npm",
              description: "unique number of each students",
              in: "path",
              required: true,
              type: "string",
            },
          ],
          produces: ["application/json"],
          responses: {
            200: {
              description: "Get the Listed Data of Individual ETD",
            },
          },
        },
      },
    },
    developer: "Chrisna Adhi Pranoto",
    purposes: "Migrate Local Repository File to DSpace",
  });
});

export default api;
