import Redis from "ioredis";
import { env } from "./env";
import { logger } from "./logger";

export const redis = env.redisUrl
  ? new Redis(env.redisUrl, {
      maxRetriesPerRequest: 2,
      enableReadyCheck: true,
      lazyConnect: true
    })
  : null;

export async function connectRedis() {
  if (!redis) return;
  if (redis.status === "ready" || redis.status === "connecting") return;
  try {
    await redis.connect();
    logger.info("Redis connected");
  } catch (error) {
    logger.warn("Redis unavailable; continuing without cache", { error });
  }
}

export async function disconnectRedis() {
  if (redis && redis.status !== "end") {
    await redis.quit();
  }
}
