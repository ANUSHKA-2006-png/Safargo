import crypto from "crypto";
import axios from "axios";
import OpenAI from "openai";
import { AiRole } from "@prisma/client";
import { env } from "../../../config/env";
import { logger } from "../../../config/logger";
import { getCachedJson, setCachedJson } from "../../../shared/cache";
import { withRetry } from "../../../shared/retry";
import { AppError } from "../../../shared/app-error";
import {
  BudgetOptimizationDto,
  ChatDto,
  DestinationRecommendationDto,
  ItineraryRequestDto,
  PackingListDto
} from "../dto/ai.dto";
import { AiRepository } from "../repositories/ai.repository";
import { AiProvider, AiStructuredResponse, ChatResponse, TravelChatMessage } from "../types/ai.types";

const CACHE_TTL_SECONDS = 60 * 60 * 6;

export class AiService {
  private readonly openai = env.openAiApiKey ? new OpenAI({ apiKey: env.openAiApiKey }) : null;

  constructor(private readonly repository = new AiRepository()) {}

  conversations(userId: string) {
    return this.repository.listConversations(userId);
  }

  generateItinerary(dto: ItineraryRequestDto) {
    const prompt = [
      "Create a practical personalized travel itinerary as JSON.",
      "Return fields: summary, days[{date,title,morning,afternoon,evening,food,estimatedCost}], tips, risks.",
      `Destination: ${dto.destination}`,
      `Dates: ${dto.startDate.toISOString()} to ${dto.endDate.toISOString()}`,
      `Travelers: ${dto.travelers}`,
      `Budget: ${dto.budget ?? "flexible"} ${dto.currency ?? "USD"}`,
      `Interests: ${(dto.interests ?? ["culture", "food", "local experiences"]).join(", ")}`,
      `Pace: ${dto.pace ?? "balanced"}`
    ].join("\n");

    return this.generateStructured("itinerary", dto, prompt, () => this.localItinerary(dto));
  }

  recommendDestinations(dto: DestinationRecommendationDto) {
    const prompt = [
      "Recommend destinations as JSON.",
      "Return fields: recommendations[{destination,country,why,bestFor,estimatedDailyBudget,idealStayDays,confidence}], tradeoffs.",
      `Origin: ${dto.origin ?? "not specified"}`,
      `Month: ${dto.month ?? "any"}`,
      `Travelers: ${dto.travelers}`,
      `Budget: ${dto.budget ?? "flexible"}`,
      `Interests: ${dto.interests.join(", ")}`,
      `Climate preference: ${dto.climate ?? "open"}`
    ].join("\n");

    return this.generateStructured("recommendations", dto, prompt, () => this.localRecommendations(dto));
  }

  optimizeBudget(dto: BudgetOptimizationDto) {
    const prompt = [
      "Optimize a travel budget as JSON.",
      "Return fields: allocation{lodging,food,transport,activities,buffer}, savings, warnings, dailyTarget.",
      `Destination: ${dto.destination}`,
      `Travelers: ${dto.travelers}`,
      `Nights: ${dto.nights}`,
      `Budget: ${dto.budget} ${dto.currency ?? "USD"}`,
      `Priorities: ${(dto.priorities ?? ["comfort", "food", "experiences"]).join(", ")}`
    ].join("\n");

    return this.generateStructured("budget", dto, prompt, () => this.localBudget(dto));
  }

  packingList(dto: PackingListDto) {
    const prompt = [
      "Build a smart packing list as JSON.",
      "Return fields: essentials, clothing, toiletries, documents, electronics, activitySpecific, leaveBehind.",
      `Destination: ${dto.destination}`,
      `Dates: ${dto.startDate.toISOString()} to ${dto.endDate.toISOString()}`,
      `Travelers: ${dto.travelers ?? 1}`,
      `Activities: ${(dto.activities ?? ["sightseeing", "dining"]).join(", ")}`,
      `Climate: ${dto.climate ?? "seasonal average"}`
    ].join("\n");

    return this.generateStructured("packing", dto, prompt, () => this.localPacking(dto));
  }

  async chat(userId: string, dto: ChatDto): Promise<ChatResponse> {
    const conversation =
      dto.conversationId
        ? await this.repository.getConversation(userId, dto.conversationId)
        : await this.repository.createConversation(userId, dto.message.slice(0, 80));

    if (!conversation) throw new AppError(404, "Conversation was not found", "CONVERSATION_NOT_FOUND");

    await this.repository.addMessage(conversation.id, AiRole.USER, dto.message, dto.context ?? {});

    const history: TravelChatMessage[] =
      "messages" in conversation
        ? conversation.messages.map((item) => ({
            role: item.role === AiRole.USER ? "user" : "assistant",
            content: item.content
          }))
        : [];

    const messages: TravelChatMessage[] = [
      {
        role: "system",
        content:
          "You are Safargo, a precise travel assistant. Give actionable, safe, budget-aware advice. Ask one concise follow-up only when needed."
      },
      ...history,
      { role: "user", content: dto.message }
    ];

    const { text, provider } = await this.generateText(messages);
    await this.repository.addMessage(conversation.id, AiRole.ASSISTANT, text, { provider });

    return { conversationId: conversation.id, provider, message: text };
  }

  private async generateStructured<T>(
    feature: string,
    input: unknown,
    prompt: string,
    fallback: () => T
  ): Promise<AiStructuredResponse<T>> {
    const cacheKey = `ai:${feature}:${this.hash(input)}`;
    const cached = await getCachedJson<T>(cacheKey);
    if (cached) return { provider: "local", cached: true, result: cached };

    const messages: TravelChatMessage[] = [
      {
        role: "system",
        content:
          "You are Safargo's travel planning engine. Return only valid JSON, no markdown, no prose outside JSON."
      },
      { role: "user", content: prompt }
    ];

    try {
      const { text, provider } = await this.generateText(messages);
      const parsed = this.parseJson<T>(text);
      await setCachedJson(cacheKey, parsed, CACHE_TTL_SECONDS);
      return { provider, cached: false, result: parsed };
    } catch (error) {
      logger.warn("AI provider failed; using deterministic local travel engine", { feature, error });
      const result = fallback();
      await setCachedJson(cacheKey, result, CACHE_TTL_SECONDS);
      return { provider: "local", cached: false, result };
    }
  }

  private async generateText(messages: TravelChatMessage[]): Promise<{ text: string; provider: AiProvider }> {
    if (this.openai) {
      const text = await withRetry(async () => {
        const response = await this.openai!.chat.completions.create({
          model: env.openAiModel,
          temperature: 0.4,
          messages
        });
        return response.choices[0]?.message?.content ?? "";
      });
      if (text.trim()) return { text, provider: "openai" };
    }

    if (env.geminiApiKey) {
      const text = await withRetry(async () => {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/${env.geminiModel}:generateContent`,
          {
            contents: messages.map((message) => ({
              role: message.role === "assistant" ? "model" : "user",
              parts: [{ text: `${message.role.toUpperCase()}: ${message.content}` }]
            }))
          },
          { params: { key: env.geminiApiKey }, timeout: 15000 }
        );
        return response.data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
      });
      if (text.trim()) return { text, provider: "gemini" };
    }

    return {
      text:
        "I can help you compare destinations, shape an itinerary, estimate costs, and prepare packing plans. Share dates, destination, budget, and travel style for the sharpest guidance.",
      provider: "local"
    };
  }

  private parseJson<T>(text: string): T {
    const trimmed = text.trim();
    const start = Math.min(
      ...["{", "["].map((token) => {
        const index = trimmed.indexOf(token);
        return index === -1 ? Number.POSITIVE_INFINITY : index;
      })
    );
    const jsonText = Number.isFinite(start) ? trimmed.slice(start) : trimmed;
    return JSON.parse(jsonText) as T;
  }

  private hash(value: unknown) {
    return crypto.createHash("sha256").update(JSON.stringify(value)).digest("hex");
  }

  private localItinerary(dto: ItineraryRequestDto) {
    const days = Math.max(1, Math.ceil((dto.endDate.getTime() - dto.startDate.getTime()) / 86400000));
    return {
      summary: `${days}-day ${dto.pace ?? "balanced"} itinerary for ${dto.destination}`,
      days: Array.from({ length: days }, (_, index) => {
        const date = new Date(dto.startDate);
        date.setDate(date.getDate() + index);
        return {
          date: date.toISOString().slice(0, 10),
          title: `Day ${index + 1} in ${dto.destination}`,
          morning: "Start with a central neighborhood walk and a highly rated local breakfast.",
          afternoon: "Visit one signature attraction, then leave space for a flexible local experience.",
          evening: "Choose dinner near the next day's starting point to reduce transit friction.",
          food: "Prioritize local specialties and reserve one standout meal.",
          estimatedCost: Math.round(((dto.budget ?? 150 * dto.travelers * days) / days) * 0.9)
        };
      }),
      tips: ["Book timed-entry attractions early", "Keep one flexible block every two days"],
      risks: ["Weather and local closures can shift the ideal order"]
    };
  }

  private localRecommendations(dto: DestinationRecommendationDto) {
    const interests = dto.interests.join(", ");
    return {
      recommendations: [
        {
          destination: "Lisbon",
          country: "Portugal",
          why: `Strong fit for ${interests}, walkable neighborhoods, and good value.`,
          bestFor: ["food", "culture", "coastal day trips"],
          estimatedDailyBudget: 130,
          idealStayDays: 5,
          confidence: 0.86
        },
        {
          destination: "Kyoto",
          country: "Japan",
          why: "Excellent for temples, gardens, food, and slower cultural immersion.",
          bestFor: ["heritage", "food", "nature"],
          estimatedDailyBudget: 170,
          idealStayDays: 4,
          confidence: 0.81
        },
        {
          destination: "Mexico City",
          country: "Mexico",
          why: "High-density food, museums, architecture, and neighborhood variety.",
          bestFor: ["food", "museums", "urban exploration"],
          estimatedDailyBudget: 115,
          idealStayDays: 5,
          confidence: 0.79
        }
      ],
      tradeoffs: ["Long-haul flights can erase lodging savings", "Peak season changes daily budget materially"]
    };
  }

  private localBudget(dto: BudgetOptimizationDto) {
    const buffer = Math.round(dto.budget * 0.12);
    const remaining = dto.budget - buffer;
    return {
      allocation: {
        lodging: Math.round(remaining * 0.38),
        food: Math.round(remaining * 0.24),
        transport: Math.round(remaining * 0.16),
        activities: Math.round(remaining * 0.22),
        buffer
      },
      savings: [
        "Anchor lodging near transit to reduce rideshare costs",
        "Pre-book two major activities and leave smaller items flexible",
        "Use lunch as the main restaurant meal when prices are lower"
      ],
      warnings: dto.budget / Math.max(dto.nights, 1) < 120 ? ["Daily budget is tight for comfort-focused travel"] : [],
      dailyTarget: Math.round(dto.budget / Math.max(dto.nights, 1))
    };
  }

  private localPacking(dto: PackingListDto) {
    return {
      essentials: ["Passport or government ID", "Wallet", "Phone", "Reusable water bottle"],
      clothing: ["Comfortable walking shoes", "Weather-appropriate layers", "Sleepwear", "One polished outfit"],
      toiletries: ["Toothbrush", "Toothpaste", "Sunscreen", "Medication", "Travel-size hygiene kit"],
      documents: ["Booking confirmations", "Travel insurance", "Emergency contacts", "Copies of IDs"],
      electronics: ["Chargers", "Power bank", "Universal adapter", "Headphones"],
      activitySpecific: (dto.activities ?? ["sightseeing"]).map((activity) => `${activity} appropriate gear`),
      leaveBehind: ["Full-size toiletries", "New shoes", "Duplicate heavy electronics"]
    };
  }
}
