import { NotificationType } from "@prisma/client";

export type CreateNotificationDto = {
  userId: string;
  title: string;
  message: string;
  type?: NotificationType;
};

export type NotificationQueryDto = {
  page?: number;
  limit?: number;
  unreadOnly?: boolean;
};
