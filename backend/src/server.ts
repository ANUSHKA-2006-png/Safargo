import { createServer } from "http";
import { createApp } from "./app";
import { env } from "./config/env";
import { logger } from "./config/logger";
import { connectRedis, disconnectRedis } from "./config/redis";
import { prisma } from "./shared/prisma";

async function bootstrap() {
  await prisma.$connect();
  await connectRedis();

  const app = createApp();
  const server = createServer(app);

  server.listen(env.port, () => {
    logger.info(`Safargo API listening on port ${env.port}`);
  });

  const shutdown = async (signal: string) => {
    logger.info(`Received ${signal}; shutting down`);
    server.close(async () => {
      await disconnectRedis();
      await prisma.$disconnect();
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => shutdown("SIGTERM"));
  process.on("SIGINT", () => shutdown("SIGINT"));
}

bootstrap().catch(async (error) => {
  logger.error("Failed to start Safargo API", { error });
  await prisma.$disconnect();
  process.exit(1);
});
