import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/async-handler";
import { sendSuccess } from "../../../shared/http";
import { CreateNotificationDto, NotificationQueryDto } from "../dto/notifications.dto";
import { NotificationsService } from "../services/notifications.service";

const service = new NotificationsService();

export const NotificationsController = {
  list: asyncHandler(async (req: Request<unknown, unknown, unknown, NotificationQueryDto>, res: Response) => {
    const result = await service.list(req.user!.id, req.query);
    return sendSuccess(res, result);
  }),

  create: asyncHandler(async (req: Request<unknown, unknown, CreateNotificationDto>, res: Response) => {
    const result = await service.create(req.body);
    return sendSuccess(res, result, 201);
  }),

  markRead: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const result = await service.markRead(req.user!.id, req.params.id);
    return sendSuccess(res, result);
  }),

  markAllRead: asyncHandler(async (req: Request, res: Response) => {
    const result = await service.markAllRead(req.user!.id);
    return sendSuccess(res, result);
  })
};
