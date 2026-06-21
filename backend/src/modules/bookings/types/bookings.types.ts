import { BookingCategory, BookingStatus } from "@prisma/client";

export type BookingView = {
  id: string;
  tripId: string;
  category: BookingCategory;
  provider: string;
  reference: string;
  startDate: Date;
  endDate: Date | null;
  cost: string;
  currency: string;
  status: BookingStatus;
  notes: string | null;
  createdAt: Date;
};
