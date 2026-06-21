import { Prisma, Trip } from "@prisma/client";
import { AppError } from "../../../shared/app-error";
import { CreateTripDto, TripQueryDto, UpdateTripDto } from "../dto/trips.dto";
import { TripsRepository } from "../repositories/trips.repository";
import { TripSummary } from "../types/trips.types";

export class TripsService {
  constructor(private readonly repository = new TripsRepository()) {}

  async list(userId: string, query: TripQueryDto) {
    const page = query.page ?? 1;
    const limit = Math.min(query.limit ?? 20, 100);
    const result = await this.repository.list(userId, page, limit, {
      status: query.status,
      destination: query.destination
    });
    return {
      trips: result.items.map(this.toSummary),
      pagination: { page, limit, total: result.total, pages: Math.ceil(result.total / limit) }
    };
  }

  async get(userId: string, id: string) {
    const trip = await this.repository.findByIdForUser(id, userId);
    if (!trip) throw new AppError(404, "Trip was not found", "TRIP_NOT_FOUND");
    return this.toSummary(trip);
  }

  async create(userId: string, dto: CreateTripDto) {
    const trip = await this.repository.create({
      userId,
      title: dto.title,
      destination: dto.destination,
      startDate: dto.startDate,
      endDate: dto.endDate,
      travelers: dto.travelers,
      budget: dto.budget,
      currency: dto.currency ?? "USD",
      status: dto.status,
      preferences: dto.preferences ?? {}
    });
    return this.toSummary(trip);
  }

  async update(userId: string, id: string, dto: UpdateTripDto) {
    await this.ensureOwned(userId, id);
    const data: Prisma.TripUpdateInput = {
      ...dto,
      preferences: dto.preferences as Prisma.InputJsonValue | undefined,
      itinerary: dto.itinerary as Prisma.InputJsonValue | undefined
    };
    const trip = await this.repository.update(id, userId, data);
    return this.toSummary(trip);
  }

  async remove(userId: string, id: string) {
    await this.ensureOwned(userId, id);
    await this.repository.delete(id, userId);
    return { deleted: true };
  }

  private async ensureOwned(userId: string, id: string) {
    const trip = await this.repository.findByIdForUser(id, userId);
    if (!trip) throw new AppError(404, "Trip was not found", "TRIP_NOT_FOUND");
  }

  private toSummary(trip: Trip): TripSummary {
    return {
      id: trip.id,
      title: trip.title,
      destination: trip.destination,
      startDate: trip.startDate,
      endDate: trip.endDate,
      travelers: trip.travelers,
      budget: trip.budget?.toString() ?? null,
      currency: trip.currency,
      status: trip.status,
      preferences: trip.preferences,
      itinerary: trip.itinerary,
      createdAt: trip.createdAt,
      updatedAt: trip.updatedAt
    };
  }
}
