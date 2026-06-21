import { api, unwrap } from "./api";
import type { NotificationItem, Pagination } from "../types";

export const notificationService = {
  list: () => unwrap<{ notifications: NotificationItem[]; pagination: Pagination }>(api.get("/notifications")),
  markRead: (id: string) => unwrap<{ read: boolean }>(api.patch(`/notifications/${id}/read`)),
  markAllRead: () => unwrap<{ updated: number }>(api.patch("/notifications/read-all"))
};
