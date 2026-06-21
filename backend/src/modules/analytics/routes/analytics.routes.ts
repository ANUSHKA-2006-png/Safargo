import { Router } from "express";
import { authenticate } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { AnalyticsController } from "../controllers/analytics.controller";
import { analyticsRangeSchema, trackEventSchema } from "../validators/analytics.validator";

export const analyticsRoutes = Router();

analyticsRoutes.use(authenticate);
analyticsRoutes.post("/events", validate({ body: trackEventSchema }), AnalyticsController.track);
analyticsRoutes.get("/overview", validate({ query: analyticsRangeSchema }), AnalyticsController.overview);
