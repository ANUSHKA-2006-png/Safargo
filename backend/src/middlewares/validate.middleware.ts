import type { NextFunction, Request, Response } from "express";
import Joi from "joi";
import { AppError } from "../shared/app-error";

type SchemaMap = {
  body?: Joi.ObjectSchema;
  params?: Joi.ObjectSchema;
  query?: Joi.ObjectSchema;
};

export function validate(schemas: SchemaMap) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const details: Record<string, string[]> = {};

    for (const [source, schema] of Object.entries(schemas) as [keyof SchemaMap, Joi.ObjectSchema][]) {
      const { error, value } = schema.validate(req[source], {
        abortEarly: false,
        stripUnknown: true,
        convert: true
      });
      if (error) {
        details[source] = error.details.map((item) => item.message);
      } else {
        req[source] = value;
      }
    }

    if (Object.keys(details).length > 0) {
      throw new AppError(422, "Validation failed", "VALIDATION_ERROR", details);
    }

    next();
  };
}
