import { Prisma } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

export class AnalyticsRepository {
  createEvent(userId: string | undefined, name: string, properties: Record<string, unknown>) {
    return prisma.analyticsEvent.create({
      data: {
        userId,
        name,
        properties
      }
    });
  }

  countTrips(userId: string) {
    return prisma.trip.count({ where: { userId } });
  }

  countUpcomingTrips(userId: string, from = new Date()) {
    return prisma.trip.count({
      where: {
        userId,
        startDate: { gte: from },
        status: { in: ["DRAFT", "PLANNED", "ACTIVE"] }
      }
    });
  }

  tripStatusGroups(userId: string) {
    return prisma.trip.groupBy({
      by: ["status"],
      where: { userId },
      _count: { status: true }
    });
  }

  bookings(userId: string) {
    return prisma.booking.findMany({
      where: { userId },
      select: { category: true, cost: true }
    });
  }

  recentEvents(userId: string, range?: { from?: Date; to?: Date }) {
    const createdAt: Prisma.DateTimeFilter | undefined =
      range?.from || range?.to ? { gte: range.from, lte: range.to } : undefined;
    return prisma.analyticsEvent.groupBy({
      by: ["name"],
      where: { userId, ...(createdAt ? { createdAt } : {}) },
      _count: { name: true },
      orderBy: { _count: { name: "desc" } },
      take: 10
    });
  }
}
