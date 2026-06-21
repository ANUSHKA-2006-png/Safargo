import Joi from "joi";
import { NotificationType } from "@prisma/client";

export const createNotificationSchema = Joi.object({
  userId: Joi.string().uuid().required(),
  title: Joi.string().min(2).max(160).required(),
  message: Joi.string().min(2).max(2000).required(),
  type: Joi.string().valid(...Object.values(NotificationType))
});

export const notificationQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  unreadOnly: Joi.boolean().default(false)
});

export const notificationIdParamSchema = Joi.object({
  id: Joi.string().uuid().required()
});
