import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import { dirname } from "node:path";
import { mkdirSync } from "node:fs";
import { env } from "../config/env.js";
import * as schema from "./schema.js";

mkdirSync(dirname(env.DATABASE_URL), { recursive: true });

const sqlite = new Database(env.DATABASE_URL);
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
export type Database = typeof db;
