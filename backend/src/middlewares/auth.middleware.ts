import type { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";
import { AppError } from "../shared/app-error";
import { verifyAccessToken } from "../shared/jwt";

export function authenticate(req: Request, _res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    throw new AppError(401, "Authentication token is required", "AUTH_REQUIRED");
  }

  const token = authorization.slice("Bearer ".length);
  try {
    const payload = verifyAccessToken(token);
    (req as any).user = {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    next();
  } catch {
    throw new AppError(401, "Invalid or expired authentication token", "AUTH_INVALID");
  }
}

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!(req as any).user) throw new AppError(401, "Authentication token is required", "AUTH_REQUIRED");
    if (!roles.includes((req as any).user.role)) {
      throw new AppError(403, "You do not have permission to access this resource", "FORBIDDEN");
    }
    next();
  };
}
