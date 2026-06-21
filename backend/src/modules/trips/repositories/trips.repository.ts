import { Prisma, TripStatus } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

export class TripsRepository {
  async list(userId: string, page: number, limit: number, filters: { status?: TripStatus; destination?: string }) {
    const where: Prisma.TripWhereInput = {
      userId,
      ...(filters.status ? { status: filters.status } : {}),
      ...(filters.destination ? { destination: { contains: filters.destination, mode: "insensitive" } } : {})
    };
    const [items, total] = await prisma.$transaction([
      prisma.trip.findMany({
        where,
        orderBy: { startDate: "asc" },
        skip: (page - 1) * limit,
        take: limit,
        include: { bookings: true }
      }),
      prisma.trip.count({ where })
    ]);
    return { items, total };
  }

  findByIdForUser(id: string, userId: string) {
    return prisma.trip.findFirst({ where: { id, userId }, include: { bookings: true } });
  }

  create(data: Prisma.TripUncheckedCreateInput) {
    return prisma.trip.create({ data });
  }

  update(id: string, userId: string, data: Prisma.TripUpdateInput) {
    return prisma.trip.update({ where: { id_userId: { id, userId } }, data });
  }

  delete(id: string, userId: string) {
    return prisma.trip.delete({ where: { id_userId: { id, userId } } });
  }
}
