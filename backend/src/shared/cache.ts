import { redis } from "../config/redis";
import { logger } from "../config/logger";

export async function getCachedJson<T>(key: string): Promise<T | null> {
  if (!redis || redis.status !== "ready") return null;
  try {
    const value = await redis.get(key);
    return value ? (JSON.parse(value) as T) : null;
  } catch (error) {
    logger.warn("Cache read failed", { key, error });
    return null;
  }
}

export async function setCachedJson(key: string, value: unknown, ttlSeconds: number) {
  if (!redis || redis.status !== "ready") return;
  try {
    await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  } catch (error) {
    logger.warn("Cache write failed", { key, error });
  }
}

export async function deleteCachePattern(pattern: string) {
  if (!redis || redis.status !== "ready") return;
  const stream = redis.scanStream({ match: pattern, count: 100 });
  const keys: string[] = [];
  stream.on("data", (chunk: string[]) => keys.push(...chunk));
  await new Promise<void>((resolve, reject) => {
    stream.on("end", resolve);
    stream.on("error", reject);
  });
  if (keys.length > 0) await redis.del(...keys);
}
