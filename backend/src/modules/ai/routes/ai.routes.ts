import { Router } from "express";
import { authenticate } from "../../../middlewares/auth.middleware";
import { aiLimiter } from "../../../middlewares/rate-limit.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { AiController } from "../controllers/ai.controller";
import { budgetSchema, chatSchema, itinerarySchema, packingSchema, recommendationSchema } from "../validators/ai.validator";

export const aiRoutes = Router();

aiRoutes.use(authenticate, aiLimiter);
aiRoutes.get("/conversations", AiController.conversations);
aiRoutes.post("/itinerary", validate({ body: itinerarySchema }), AiController.itinerary);
aiRoutes.post("/recommendations", validate({ body: recommendationSchema }), AiController.recommendations);
aiRoutes.post("/budget", validate({ body: budgetSchema }), AiController.budget);
aiRoutes.post("/packing-list", validate({ body: packingSchema }), AiController.packingList);
aiRoutes.post("/chat", validate({ body: chatSchema }), AiController.chat);
