import { Router } from "express";
import { authenticate } from "../../../middlewares/auth.middleware";
import { validate } from "../../../middlewares/validate.middleware";
import { BookingsController } from "../controllers/bookings.controller";
import {
  bookingIdParamSchema,
  bookingQuerySchema,
  createBookingSchema,
  updateBookingSchema
} from "../validators/bookings.validator";

export const bookingRoutes = Router();

bookingRoutes.use(authenticate);
bookingRoutes.get("/", validate({ query: bookingQuerySchema }), BookingsController.list);
bookingRoutes.post("/", validate({ body: createBookingSchema }), BookingsController.create);
bookingRoutes.patch("/:id", validate({ params: bookingIdParamSchema, body: updateBookingSchema }), BookingsController.update);
bookingRoutes.delete("/:id", validate({ params: bookingIdParamSchema }), BookingsController.remove);
