import type { Request, Response } from "express";
import { asyncHandler } from "../../../shared/async-handler";
import { sendSuccess } from "../../../shared/http";
import {
  BudgetOptimizationDto,
  ChatDto,
  DestinationRecommendationDto,
  ItineraryRequestDto,
  PackingListDto
} from "../dto/ai.dto";
import { AiService } from "../services/ai.service";

const service = new AiService();

export const AiController = {
  conversations: asyncHandler(async (req: Request, res: Response) => {
    const result = await service.conversations(req.user!.id);
    return sendSuccess(res, result);
  }),

  itinerary: asyncHandler(async (req: Request<unknown, unknown, ItineraryRequestDto>, res: Response) => {
    const result = await service.generateItinerary(req.body);
    return sendSuccess(res, result);
  }),

  recommendations: asyncHandler(async (req: Request<unknown, unknown, DestinationRecommendationDto>, res: Response) => {
    const result = await service.recommendDestinations(req.body);
    return sendSuccess(res, result);
  }),

  budget: asyncHandler(async (req: Request<unknown, unknown, BudgetOptimizationDto>, res: Response) => {
    const result = await service.optimizeBudget(req.body);
    return sendSuccess(res, result);
  }),

  packingList: asyncHandler(async (req: Request<unknown, unknown, PackingListDto>, res: Response) => {
    const result = await service.packingList(req.body);
    return sendSuccess(res, result);
  }),

  chat: asyncHandler(async (req: Request<unknown, unknown, ChatDto>, res: Response) => {
    const result = await service.chat(req.user!.id, req.body);
    return sendSuccess(res, result);
  })
};
