import { Router } from "express";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { userRoutes } from "../modules/users/routes/users.routes";
import { tripRoutes } from "../modules/trips/routes/trips.routes";
import { bookingRoutes } from "../modules/bookings/routes/bookings.routes";
import { notificationRoutes } from "../modules/notifications/routes/notifications.routes";
import { analyticsRoutes } from "../modules/analytics/routes/analytics.routes";
import { aiRoutes } from "../modules/ai/routes/ai.routes";

export const apiRouter = Router();

apiRouter.use("/auth", authRoutes);
apiRouter.use("/users", userRoutes);
apiRouter.use("/trips", tripRoutes);
apiRouter.use("/bookings", bookingRoutes);
apiRouter.use("/notifications", notificationRoutes);
apiRouter.use("/analytics", analyticsRoutes);
apiRouter.use("/ai", aiRoutes);
