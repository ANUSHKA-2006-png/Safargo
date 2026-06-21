import { api, unwrap } from "./api";
import type { AiStructuredResponse } from "../types";

export const aiService = {
  itinerary: <T>(input: unknown) => unwrap<AiStructuredResponse<T>>(api.post("/ai/itinerary", input)),
  recommendations: <T>(input: unknown) => unwrap<AiStructuredResponse<T>>(api.post("/ai/recommendations", input)),
  budget: <T>(input: unknown) => unwrap<AiStructuredResponse<T>>(api.post("/ai/budget", input)),
  packingList: <T>(input: unknown) => unwrap<AiStructuredResponse<T>>(api.post("/ai/packing-list", input)),
  chat: (input: { conversationId?: string; message: string; context?: Record<string, unknown> }) =>
    unwrap<{ conversationId: string; provider: "openai" | "gemini" | "local"; message: string }>(api.post("/ai/chat", input)),
  conversations: () => unwrap<unknown[]>(api.get("/ai/conversations"))
};
