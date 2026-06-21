export type AnalyticsOverview = {
  trips: {
    total: number;
    upcoming: number;
    byStatus: Record<string, number>;
  };
  bookings: {
    total: number;
    spendByCategory: Record<string, number>;
  };
  events: {
    recent: Array<{ name: string; count: number }>;
  };
};
