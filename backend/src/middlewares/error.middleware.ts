import type { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { AppError } from "../shared/app-error";
import { logger } from "../config/logger";
import { env } from "../config/env";

export function errorMiddleware(error: unknown, req: Request, res: Response, _next: NextFunction) {
  let statusCode = 500;
  let message = "Internal server error";
  let code = "INTERNAL_ERROR";
  let details: unknown;

  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    code = error.code;
    details = error.details;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    statusCode = error.code === "P2002" ? 409 : 400;
    message = error.code === "P2002" ? "A record with this value already exists" : "Database request failed";
    code = error.code;
    details = error.meta;
  } else if (error instanceof Error) {
    message = env.nodeEnv === "production" ? message : error.message;
  }

  logger.error("Request failed", {
    method: req.method,
    path: req.path,
    statusCode,
    code,
    error
  });

  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {})
    }
  });
}
