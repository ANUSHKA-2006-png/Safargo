import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/async-handler";
import { sendSuccess } from "../../../shared/http";
import { BookingQueryDto, CreateBookingDto, UpdateBookingDto } from "../dto/bookings.dto";
import { BookingsService } from "../services/bookings.service";

const service = new BookingsService();

export const BookingsController = {
  list: asyncHandler(async (req: Request<unknown, unknown, unknown, BookingQueryDto>, res: Response) => {
    const result = await service.list(req.user!.id, req.query);
    return sendSuccess(res, result);
  }),

  create: asyncHandler(async (req: Request<unknown, unknown, CreateBookingDto>, res: Response) => {
    const result = await service.create(req.user!.id, req.body);
    return sendSuccess(res, result, 201);
  }),

  update: asyncHandler(async (req: Request<{ id: string }, unknown, UpdateBookingDto>, res: Response) => {
    const result = await service.update(req.user!.id, req.params.id, req.body);
    return sendSuccess(res, result);
  }),

  remove: asyncHandler(async (req: Request<{ id: string }>, res: Response) => {
    const result = await service.remove(req.user!.id, req.params.id);
    return sendSuccess(res, result);
  })
};
