import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const connection = await mysql.createConnection({
  host: process.env.DRIZZLE_HOST,
  user: process.env.DRIZZLE_USERNAME,
  port: Number(process.env.DRIZZLE_PORT),
  password: process.env.DRIZZLE_PASSWORD,
  database: process.env.DRIZZLE_DATABASE,
});

const poolConnection = mysql.createPool({
  host: process.env.DRIZZLE_HOST,
  user: process.env.DRIZZLE_USERNAME,
  port: Number(process.env.DRIZZLE_PORT),
  password: process.env.DRIZZLE_PASSWORD,
  database: process.env.DRIZZLE_DATABASE,
});

export const db = drizzle(poolConnection);
