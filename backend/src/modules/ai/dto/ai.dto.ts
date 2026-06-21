export type ItineraryRequestDto = {
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget?: number;
  currency?: string;
  interests?: string[];
  pace?: "relaxed" | "balanced" | "packed";
};

export type DestinationRecommendationDto = {
  origin?: string;
  month?: string;
  travelers: number;
  budget?: number;
  interests: string[];
  climate?: string;
};

export type BudgetOptimizationDto = {
  destination: string;
  travelers: number;
  nights: number;
  budget: number;
  currency?: string;
  priorities?: string[];
};

export type PackingListDto = {
  destination: string;
  startDate: Date;
  endDate: Date;
  activities?: string[];
  travelers?: number;
  climate?: string;
};

export type ChatDto = {
  conversationId?: string;
  message: string;
  context?: Record<string, unknown>;
};
