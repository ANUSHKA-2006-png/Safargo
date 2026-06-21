import { BookingCategory, BookingStatus } from "@prisma/client";

export type CreateBookingDto = {
  tripId: string;
  category: BookingCategory;
  provider: string;
  reference: string;
  startDate: Date;
  endDate?: Date | null;
  cost: number;
  currency?: string;
  status?: BookingStatus;
  notes?: string | null;
};

export type UpdateBookingDto = Partial<Omit<CreateBookingDto, "tripId">>;

export type BookingQueryDto = {
  page?: number;
  limit?: number;
  tripId?: string;
  category?: BookingCategory;
  status?: BookingStatus;
};
