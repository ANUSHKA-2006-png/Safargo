import { NotificationType } from "@prisma/client";

export type NotificationView = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  readAt: Date | null;
  createdAt: Date;
};
