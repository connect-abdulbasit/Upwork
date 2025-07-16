import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import { config } from "../src/config/index"
import * as schema from "./schema"

const client = postgres(config.databaseUrl)
export const db = drizzle(client, { schema })

export type Database = typeof db
export { schema }