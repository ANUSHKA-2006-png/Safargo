import express from "express";
import swaggerUi from "swagger-ui-express";
import { applySecurity } from "./config/security";
import { swaggerSpec } from "./config/swagger";
import { apiLimiter } from "./middlewares/rate-limit.middleware";
import { requestLogger } from "./middlewares/request-logger.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { errorMiddleware } from "./middlewares/error.middleware";
import { apiRouter } from "./routes";

export function createApp() {
  const app = express();

  applySecurity(app);
  app.use(express.json({ limit: "1mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(requestLogger);
  app.use(apiLimiter);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "safargo-api" });
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api/v1", apiRouter);
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);

  return app;
}
