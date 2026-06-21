import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/async-handler";
import { sendSuccess } from "../../../shared/http";
import { UsersService } from "../services/users.service";
import { UpdateUserDto, UserQueryDto } from "../dto/users.dto";

const service = new UsersService();

export const UsersController = {
  list: asyncHandler(async (req: Request<unknown, unknown, unknown, UserQueryDto>, res: Response) => {
    const result = await service.list(req.query);
    return sendSuccess(res, result);
  }),

  getById: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const result = await service.getProfile(req.user!.id, req.user!.role, req.params.id);
    return sendSuccess(res, result);
  }),

  updateMe: asyncHandler(async (req: Request<unknown, unknown, UpdateUserDto>, res: Response) => {
    const result = await service.updateProfile(req.user!.id, req.body);
    return sendSuccess(res, result);
  })
};
