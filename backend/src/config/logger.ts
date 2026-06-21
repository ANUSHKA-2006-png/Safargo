import winston from "winston";
import { env } from "./env";

export const logger = winston.createLogger({
  level: env.logLevel,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: "safargo-api" },
  transports: [
    new winston.transports.Console({
      format:
        env.nodeEnv === "production"
          ? winston.format.json()
          : winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
});
