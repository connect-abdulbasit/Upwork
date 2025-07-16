import 'dotenv/config';
import { config } from "./src/config/index.js"

export default {
  schema: "./database/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: config.databaseUrl,
  },
}
