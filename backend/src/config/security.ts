import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import type { Express } from "express";
import { env } from "./env";

export function applySecurity(app: Express) {
  app.disable("x-powered-by");
  app.use(helmet());
  app.use(compression());
  app.use(
    cors({
      origin: env.corsOrigin.split(",").map((origin) => origin.trim()),
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
  );
}
