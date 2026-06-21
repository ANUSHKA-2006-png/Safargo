export type Role = "USER" | "ADMIN";

export type User = {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone: string | null;
  homeAirport: string | null;
  travelStyle: string;
  createdAt: string;
  updatedAt?: string;
};

export type AuthTokens = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResult = {
  user: User;
  tokens: AuthTokens;
};

export type TripStatus = "DRAFT" | "PLANNED" | "ACTIVE" | "COMPLETED" | "CANCELLED";

export type Trip = {
  id: string;
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget: string | null;
  currency: string;
  status: TripStatus;
  preferences: unknown;
  itinerary: unknown;
  createdAt: string;
  updatedAt: string;
};

export type CreateTripInput = {
  title: string;
  destination: string;
  startDate: string;
  endDate: string;
  travelers: number;
  budget?: number;
  currency?: string;
  preferences?: Record<string, unknown>;
};

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  meta?: Record<string, unknown>;
};

export type Pagination = {
  page: number;
  limit: number;
  total: number;
  pages: number;
};

export type AiStructuredResponse<T> = {
  provider: "openai" | "gemini" | "local";
  cached: boolean;
  result: T;
};

export type AnalyticsOverview = {
  trips: { total: number; upcoming: number; byStatus: Record<string, number> };
  bookings: { total: number; spendByCategory: Record<string, number> };
  events: { recent: Array<{ name: string; count: number }> };
};

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: "INFO" | "SUCCESS" | "WARNING" | "ERROR";
  readAt: string | null;
  createdAt: string;
};
