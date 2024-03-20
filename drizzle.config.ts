import type { Config } from "drizzle-kit";

export default {
  schema: "src/database/schema.ts",
  out: "src/database/migrations",
  driver: "mysql2",
  dbCredentials: {
    host: process.env.DRIZZLE_HOST!,
    password: process.env.DRIZZLE_PASSWORD,
    user: process.env.DRIZZLE_USERNAME,
    port: Number(process.env.DRIZZLE_PORT),
    database: process.env.DRIZZLE_DATABASE!,
  },
} satisfies Config;
