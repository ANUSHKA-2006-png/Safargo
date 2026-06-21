import { TripStatus } from "@prisma/client";

export type TripSummary = {
  id: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget: string | null;
  currency: string;
  status: TripStatus;
  preferences: unknown;
  itinerary: unknown;
  createdAt: Date;
  updatedAt: Date;
};
