import { AnalyticsRangeQueryDto, TrackEventDto } from "../dto/analytics.dto";
import { AnalyticsRepository } from "../repositories/analytics.repository";
import { AnalyticsOverview } from "../types/analytics.types";

export class AnalyticsService {
  constructor(private readonly repository = new AnalyticsRepository()) {}

  track(userId: string | undefined, dto: TrackEventDto) {
    return this.repository.createEvent(userId, dto.name, dto.properties ?? {});
  }

  async overview(userId: string, range?: AnalyticsRangeQueryDto): Promise<AnalyticsOverview> {
    const [totalTrips, upcomingTrips, statusGroups, bookings, events] = await Promise.all([
      this.repository.countTrips(userId),
      this.repository.countUpcomingTrips(userId),
      this.repository.tripStatusGroups(userId),
      this.repository.bookings(userId),
      this.repository.recentEvents(userId, range)
    ]);

    const spendByCategory = bookings.reduce<Record<string, number>>((acc, booking) => {
      acc[booking.category] = (acc[booking.category] ?? 0) + Number(booking.cost);
      return acc;
    }, {});

    return {
      trips: {
        total: totalTrips,
        upcoming: upcomingTrips,
        byStatus: Object.fromEntries(statusGroups.map((item) => [item.status, item._count.status]))
      },
      bookings: {
        total: bookings.length,
        spendByCategory
      },
      events: {
        recent: events.map((event) => ({ name: event.name, count: event._count.name }))
      }
    };
  }
}
