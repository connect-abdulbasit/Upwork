import dotenv from "dotenv"
import { z } from "zod"

dotenv.config()

const configSchema = z.object({
  nodeEnv: z.enum(["development", "production", "test"]).default("development"),
  port: z.coerce.number().default(3000),
  apiVersion: z.string().default("v1"),
  databaseUrl: z.string().min(1, "Database URL is required"),
  jwtSecret: z.string().min(32, "JWT secret must be at least 32 characters"),
  jwtExpiresIn: z.string().default("7d"),
  jwtRefreshSecret: z.string().min(32, "JWT refresh secret must be at least 32 characters"),
  jwtRefreshExpiresIn: z.string().default("30d"),
  rateLimitWindowMs: z.coerce.number().default(15 * 60 * 1000), // 15 minutes
  rateLimitMaxRequests: z.coerce.number().default(100),
  corsOrigin: z.string().default("http://localhost:3000"),
  logLevel: z.enum(["error", "warn", "info", "debug"]).default("info"),
})

const configData = {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.PORT,
  apiVersion: process.env.API_VERSION,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  jwtRefreshSecret: process.env.JWT_REFRESH_SECRET,
  jwtRefreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
  rateLimitWindowMs: process.env.RATE_LIMIT_WINDOW_MS,
  rateLimitMaxRequests: process.env.RATE_LIMIT_MAX_REQUESTS,
  corsOrigin: process.env.CORS_ORIGIN,
  logLevel: process.env.LOG_LEVEL,
}

export const config = configSchema.parse(configData)
