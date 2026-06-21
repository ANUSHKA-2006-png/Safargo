import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/async-handler";
import { sendSuccess } from "../../../shared/http";
import { CreateTripDto, TripQueryDto, UpdateTripDto } from "../dto/trips.dto";
import { TripsService } from "../services/trips.service";

const service = new TripsService();

export const TripsController = {
  list: asyncHandler(async (req: Request<unknown, unknown, unknown, TripQueryDto>, res: Response) => {
    const result = await service.list(req.user!.id, req.query);
    return sendSuccess(res, result);
  }),

  get: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const result = await service.get(req.user!.id, req.params.id);
    return sendSuccess(res, result);
  }),

  create: asyncHandler(async (req: Request<unknown, unknown, CreateTripDto>, res: Response) => {
    const result = await service.create(req.user!.id, req.body);
    return sendSuccess(res, result, 201);
  }),

  update: asyncHandler(async (req: Request<{ id: string }, unknown, UpdateTripDto>, res: Response) => {
    const result = await service.update(req.user!.id, req.params.id, req.body);
    return sendSuccess(res, result);
  }),

  remove: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const result = await service.remove(req.user!.id, req.params.id);
    return sendSuccess(res, result);
  })
};
