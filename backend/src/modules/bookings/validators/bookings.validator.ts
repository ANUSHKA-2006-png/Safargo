import Joi from "joi";
import { BookingCategory, BookingStatus } from "@prisma/client";

const bookingBase = {
  category: Joi.string().valid(...Object.values(BookingCategory)),
  provider: Joi.string().min(2).max(120),
  reference: Joi.string().min(2).max(120),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().allow(null),
  cost: Joi.number().precision(2).min(0),
  currency: Joi.string().uppercase().length(3),
  status: Joi.string().valid(...Object.values(BookingStatus)),
  notes: Joi.string().max(1000).allow(null, "")
};

export const createBookingSchema = Joi.object({
  tripId: Joi.string().uuid().required(),
  category: bookingBase.category.required(),
  provider: bookingBase.provider.required(),
  reference: bookingBase.reference.required(),
  startDate: bookingBase.startDate.required(),
  endDate: bookingBase.endDate,
  cost: bookingBase.cost.required(),
  currency: bookingBase.currency,
  status: bookingBase.status,
  notes: bookingBase.notes
});

export const updateBookingSchema = Joi.object(bookingBase).min(1);

export const bookingQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  tripId: Joi.string().uuid(),
  category: Joi.string().valid(...Object.values(BookingCategory)),
  status: Joi.string().valid(...Object.values(BookingStatus))
});

export const bookingIdParamSchema = Joi.object({
  id: Joi.string().uuid().required()
});
