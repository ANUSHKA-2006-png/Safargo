import { TripStatus } from "@prisma/client";

export type CreateTripDto = {
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  travelers: number;
  budget?: number;
  currency?: string;
  status?: TripStatus;
  preferences?: Record<string, unknown>;
};

export type UpdateTripDto = Partial<CreateTripDto> & {
  itinerary?: unknown;
};

export type TripQueryDto = {
  page?: number;
  limit?: number;
  status?: TripStatus;
  destination?: string;
};
