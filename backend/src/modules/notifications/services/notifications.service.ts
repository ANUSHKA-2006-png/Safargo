import { Notification } from "@prisma/client";
import { AppError } from "../../../shared/app-error";
import { CreateNotificationDto, NotificationQueryDto } from "../dto/notifications.dto";
import { NotificationsRepository } from "../repositories/notifications.repository";
import { NotificationView } from "../types/notifications.types";

export class NotificationsService {
  constructor(private readonly repository = new NotificationsRepository()) {}

  async list(userId: string, query: NotificationQueryDto) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const result = await this.repository.list(userId, page, limit, query.unreadOnly);
    return {
      notifications: result.items.map(this.toView),
      pagination: { page, limit, total: result.total, pages: Math.ceil(result.total / limit) }
    };
  }

  async create(dto: CreateNotificationDto) {
    const notification = await this.repository.create({
      userId: dto.userId,
      title: dto.title,
      message: dto.message,
      type: dto.type ?? "INFO"
    });
    return this.toView(notification);
  }

  async markRead(userId: string, id: string) {
    const result = await this.repository.markRead(id, userId);
    if (result.count === 0) throw new AppError(404, "Notification was not found", "NOTIFICATION_NOT_FOUND");
    return { read: true };
  }

  async markAllRead(userId: string) {
    const result = await this.repository.markAllRead(userId);
    return { updated: result.count };
  }

  private toView(notification: Notification): NotificationView {
    return {
      id: notification.id,
      title: notification.title,
      message: notification.message,
      type: notification.type,
      readAt: notification.readAt,
      createdAt: notification.createdAt
    };
  }
}
