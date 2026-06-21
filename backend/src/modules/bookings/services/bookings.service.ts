import { Booking } from "@prisma/client";
import { AppError } from "../../../shared/app-error";
import { BookingQueryDto, CreateBookingDto, UpdateBookingDto } from "../dto/bookings.dto";
import { BookingsRepository } from "../repositories/bookings.repository";
import { BookingView } from "../types/bookings.types";

export class BookingsService {
  constructor(private readonly repository = new BookingsRepository()) {}

  async list(userId: string, query: BookingQueryDto) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const result = await this.repository.list(userId, page, limit, query);
    return {
      bookings: result.items.map(this.toView),
      pagination: { page, limit, total: result.total, pages: Math.ceil(result.total / limit) }
    };
  }

  async create(userId: string, dto: CreateBookingDto) {
    const trip = await this.repository.findTripForUser(dto.tripId, userId);
    if (!trip) throw new AppError(404, "Trip was not found", "TRIP_NOT_FOUND");
    const booking = await this.repository.create({
      ...dto,
      currency: dto.currency ?? trip.currency,
      userId
    });
    return this.toView(booking);
  }

  async update(userId: string, id: string, dto: UpdateBookingDto) {
    await this.ensureOwned(userId, id);
    const booking = await this.repository.update(id, userId, dto);
    return this.toView(booking);
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.repository.delete(id, userId);
    return { deleted: true };
  }

  private async ensureOwned(userId: string, id: string) {
    const booking = await this.repository.findByIdForUser(id, userId);
    if (!booking) throw new AppError(404, "Booking was not found", "BOOKING_NOT_FOUND");
  }

  private toView(booking: Booking): BookingView {
    return {
      id: booking.id,
      tripId: booking.tripId,
      category: booking.category,
      provider: booking.provider,
      reference: booking.reference,
      startDate: booking.startDate,
      endDate: booking.endDate,
      cost: booking.cost.toString(),
      currency: booking.currency,
      status: booking.status,
      notes: booking.notes,
      createdAt: booking.createdAt
    };
  }
}
