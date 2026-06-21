import Joi from "joi";
import { TripStatus } from "@prisma/client";

const tripBase = {
  title: Joi.string().min(2).max(160),
  destination: Joi.string().min(2).max(160),
  startDate: Joi.date().iso(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")),
  travelers: Joi.number().integer().min(1).max(50),
  budget: Joi.number().precision(2).min(0),
  currency: Joi.string().uppercase().length(3),
  status: Joi.string().valid(...Object.values(TripStatus)),
  preferences: Joi.object().unknown(true)
};

export const createTripSchema = Joi.object({
  ...tripBase,
  title: tripBase.title.required(),
  destination: tripBase.destination.required(),
  startDate: tripBase.startDate.required(),
  endDate: tripBase.endDate.required(),
  travelers: tripBase.travelers.required()
});

export const updateTripSchema = Joi.object({
  ...tripBase,
  itinerary: Joi.alternatives().try(Joi.object().unknown(true), Joi.array())
}).min(1);

export const tripQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  status: Joi.string().valid(...Object.values(TripStatus)),
  destination: Joi.string().max(160)
});

export const tripIdParamSchema = Joi.object({
  id: Joi.string().uuid().required()
});
