import Joi from "joi";

export const trackEventSchema = Joi.object({
  name: Joi.string().pattern(/^[a-z][a-z0-9_.-]{1,80}$/).required(),
  properties: Joi.object().unknown(true).default({})
});

export const analyticsRangeSchema = Joi.object({
  from: Joi.date().iso(),
  to: Joi.date().iso().min(Joi.ref("from"))
});
