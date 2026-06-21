import { PrismaClient } from "@prisma/client";
import { env } from "../config/env";

export const prisma = new PrismaClient({
  log: env.nodeEnv === "development" ? ["query", "warn", "error"] : ["error"]
});
