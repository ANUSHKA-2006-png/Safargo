import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/async-handler";
import { sendSuccess } from "../../../shared/http";
import { AnalyticsRangeQueryDto, TrackEventDto } from "../dto/analytics.dto";
import { AnalyticsService } from "../services/analytics.service";

const service = new AnalyticsService();

export const AnalyticsController = {
  track: asyncHandler(async (req: Request<unknown, unknown, TrackEventDto>, res: Response) => {
    const result = await service.track(req.user?.id, req.body);
    return sendSuccess(res, result, 201);
  }),

  overview: asyncHandler(async (req: Request<unknown, unknown, unknown, AnalyticsRangeQueryDto>, res: Response) => {
    const result = await service.overview(req.user!.id, req.query);
    return sendSuccess(res, result);
  })
};
