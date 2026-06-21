import Joi from "joi";

export const updateUserSchema = Joi.object({
  name: Joi.string().min(2).max(120),
  phone: Joi.string().max(32).allow(null),
  homeAirport: Joi.string().uppercase().length(3).allow(null),
  travelStyle: Joi.string().valid("budget", "balanced", "luxury", "adventure", "family", "curated")
}).min(1);

export const userQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  search: Joi.string().max(120)
});

export const userIdParamSchema = Joi.object({
  id: Joi.string().uuid().required()
});
