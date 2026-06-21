import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/async-handler";
import { sendSuccess } from "../../../shared/http";
import { AuthService } from "../services/auth.service";
import { LoginDto, RefreshTokenDto, RegisterDto } from "../dto/auth.dto";



const service = new AuthService();

export const AuthController = {
  register: asyncHandler(async (req: Request<unknown, unknown, RegisterDto>, res: Response) => {
    const result = await service.register(req.body);
    return sendSuccess(res, result, 201);
  }),

  login: asyncHandler(async (req: Request<unknown, unknown, LoginDto>, res: Response) => {
    const result = await service.login(req.body);
    return sendSuccess(res, result);
  }),

  refresh: asyncHandler(async (req: Request<unknown, unknown, RefreshTokenDto>, res: Response) => {
    const result = await service.refresh(req.body.refreshToken);
    return sendSuccess(res, result);
  }),

  logout: asyncHandler(async (req: Request, res: Response) => {
    await service.logout((req as any).user.id);
    return sendSuccess(res, { loggedOut: true });
  }),

  me: asyncHandler(async (req: Request, res: Response) => {
    const user = await service.me((req as any).user.id);
    return sendSuccess(res, user);
  })
};