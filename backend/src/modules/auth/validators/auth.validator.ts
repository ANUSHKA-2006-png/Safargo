import Joi from "joi";

export const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(10).max(128).required(),
  name: Joi.string().min(2).max(120).required(),
  phone: Joi.string().max(32),
  homeAirport: Joi.string().uppercase().length(3),
  travelStyle: Joi.string().valid("budget", "balanced", "luxury", "adventure", "family", "curated")
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(1).max(128).required()
});

export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required()
});
