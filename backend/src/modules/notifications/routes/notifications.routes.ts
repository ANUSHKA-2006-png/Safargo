import { Role } from "@prisma/client";
import { Router } from "express";
import { authenticate, authorize } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { NotificationsController } from "../controllers/notifications.controller";
import {
  createNotificationSchema,
  notificationIdParamSchema,
  notificationQuerySchema
} from "../validators/notifications.validator";

export const notificationRoutes = Router();

notificationRoutes.use(authenticate);
notificationRoutes.get("/", validate({ query: notificationQuerySchema }), NotificationsController.list);
notificationRoutes.post("/", authorize(Role.ADMIN), validate({ body: createNotificationSchema }), NotificationsController.create);
notificationRoutes.patch("/read-all", NotificationsController.markAllRead);
notificationRoutes.patch("/:id/read", validate({ params: notificationIdParamSchema }), NotificationsController.markRead);
