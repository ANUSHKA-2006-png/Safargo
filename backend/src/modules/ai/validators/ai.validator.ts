import Joi from "joi";

export const itinerarySchema = Joi.object({
  destination: Joi.string().min(2).max(160).required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
  travelers: Joi.number().integer().min(1).max(50).required(),
  budget: Joi.number().precision(2).min(0),
  currency: Joi.string().uppercase().length(3).default("USD"),
  interests: Joi.array().items(Joi.string().max(80)).max(12),
  pace: Joi.string().valid("relaxed", "balanced", "packed").default("balanced")
});

export const recommendationSchema = Joi.object({
  origin: Joi.string().max(120),
  month: Joi.string().max(24),
  travelers: Joi.number().integer().min(1).max(50).required(),
  budget: Joi.number().precision(2).min(0),
  interests: Joi.array().items(Joi.string().max(80)).min(1).max(12).required(),
  climate: Joi.string().max(80)
});

export const budgetSchema = Joi.object({
  destination: Joi.string().min(2).max(160).required(),
  travelers: Joi.number().integer().min(1).max(50).required(),
  nights: Joi.number().integer().min(1).max(90).required(),
  budget: Joi.number().precision(2).min(1).required(),
  currency: Joi.string().uppercase().length(3).default("USD"),
  priorities: Joi.array().items(Joi.string().max(80)).max(10)
});

export const packingSchema = Joi.object({
  destination: Joi.string().min(2).max(160).required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().greater(Joi.ref("startDate")).required(),
  activities: Joi.array().items(Joi.string().max(80)).max(15),
  travelers: Joi.number().integer().min(1).max(50),
  climate: Joi.string().max(80)
});

export const chatSchema = Joi.object({
  conversationId: Joi.string().uuid(),
  message: Joi.string().min(1).max(4000).required(),
  context: Joi.object().unknown(true)
});
