export type AiProvider = "openai" | "gemini" | "local";

export type AiStructuredResponse<T> = {
  provider: AiProvider;
  cached: boolean;
  result: T;
};

export type TravelChatMessage = {
  role: "user" | "assistant" | "system";
  content: string;
};

export type ChatResponse = {
  conversationId: string;
  provider: AiProvider;
  message: string;
};
