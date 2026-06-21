import dotenv from "dotenv";
import Joi from "joi";

dotenv.config();

const schema = Joi.object({
  NODE_ENV: Joi.string().valid("development", "test", "production").default("development"),
  PORT: Joi.number().port().default(8080),
  DATABASE_URL: Joi.string().uri({ scheme: ["postgresql", "postgres"] }).required(),
  REDIS_URL: Joi.string().uri({ scheme: ["redis", "rediss"] }).allow("").default(""),
  CORS_ORIGIN: Joi.string().default("http://localhost:5173"),
  JWT_ACCESS_SECRET: Joi.string().min(24).required(),
  JWT_REFRESH_SECRET: Joi.string().min(24).required(),
  JWT_ACCESS_EXPIRES_IN: Joi.string().default("15m"),
  JWT_REFRESH_EXPIRES_IN: Joi.string().default("7d"),
  OPENAI_API_KEY: Joi.string().allow("").default(""),
  OPENAI_MODEL: Joi.string().default("gpt-4o-mini"),
  GEMINI_API_KEY: Joi.string().allow("").default(""),
  GEMINI_MODEL: Joi.string().default("gemini-1.5-flash"),
  LOG_LEVEL: Joi.string().default("info")
}).unknown(true);

const { value, error } = schema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Environment validation failed: ${error.message}`);
}

export const env = {
  nodeEnv: value.NODE_ENV as "development" | "test" | "production",
  port: Number(value.PORT),
  databaseUrl: String(value.DATABASE_URL),
  redisUrl: String(value.REDIS_URL),
  corsOrigin: String(value.CORS_ORIGIN),
  jwtAccessSecret: String(value.JWT_ACCESS_SECRET),
  jwtRefreshSecret: String(value.JWT_REFRESH_SECRET),
  jwtAccessExpiresIn: String(value.JWT_ACCESS_EXPIRES_IN),
  jwtRefreshExpiresIn: String(value.JWT_REFRESH_EXPIRES_IN),
  openAiApiKey: String(value.OPENAI_API_KEY),
  openAiModel: String(value.OPENAI_MODEL),
  geminiApiKey: String(value.GEMINI_API_KEY),
  geminiModel: String(value.GEMINI_MODEL),
  logLevel: String(value.LOG_LEVEL)
};
