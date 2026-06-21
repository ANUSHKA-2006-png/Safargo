import { BookingCategory, BookingStatus, Prisma } from "@prisma/client";
import { prisma } from "../../../shared/prisma";

export class BookingsRepository {
  async list(
    userId: string,
    page: number,
    limit: number,
    filters: { tripId?: string; category?: BookingCategory; status?: BookingStatus }
  ) {
    const where: Prisma.BookingWhereInput = { userId, ...filters };
    const [items, total] = await prisma.$transaction([
      prisma.booking.findMany({
        where,
        orderBy: { startDate: "asc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.booking.count({ where })
    ]);
    return { items, total };
  }

  findTripForUser(tripId: string, userId: string) {
    return prisma.trip.findFirst({ where: { id: tripId, userId } });
  }

  findByIdForUser(id: string, userId: string) {
    return prisma.booking.findFirst({ where: { id, userId } });
  }

  create(data: Prisma.BookingUncheckedCreateInput) {
    return prisma.booking.create({ data });
  }

  update(id: string, userId: string, data: Prisma.BookingUpdateInput) {
    return prisma.booking.update({ where: { id_userId: { id, userId } }, data });
  }

  delete(id: string, userId: string) {
    return prisma.booking.delete({ where: { id_userId: { id, userId } } });
  }
}
