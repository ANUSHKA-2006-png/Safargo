import { useEffect, useState } from "react";
import { CalendarCheck, CreditCard, MapPinned } from "lucide-react";
import { BudgetChart } from "../../components/charts/BudgetChart";
import { TripStatusChart } from "../../components/charts/TripStatusChart";
import { MetricCard } from "../../components/cards/MetricCard";
import { TripCard } from "../../components/cards/TripCard";
import { EmptyState } from "../../components/common/EmptyState";
import { LoadingState } from "../../components/common/LoadingState";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { analyticsService } from "../../services/analyticsService";
import { fetchTrips } from "../../store/tripsSlice";
import type { AnalyticsOverview } from "../../types";
import { formatCurrency } from "../../utils/formatters";

export function Dashboard() {
  const dispatch = useAppDispatch();
  const trips = useAppSelector((state) => state.trips.items);
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void dispatch(fetchTrips());
    analyticsService
      .overview()
      .then(setOverview)
      .catch(() => setOverview(null))
      .finally(() => setLoading(false));
  }, [dispatch]);

  if (loading && !overview) return <LoadingState label="Preparing your travel dashboard" />;

  const spend = overview?.bookings.spendByCategory ?? {};
  const spendData = Object.entries(spend).map(([name, value]) => ({ name, value }));
  const statusData = Object.entries(overview?.trips.byStatus ?? {}).map(([status, count]) => ({ status, count }));
  const totalSpend = Object.values(spend).reduce((sum, value) => sum + value, 0);

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Total trips" value={overview?.trips.total ?? trips.length} icon={<MapPinned className="h-5 w-5" />} />
        <MetricCard label="Upcoming trips" value={overview?.trips.upcoming ?? 0} icon={<CalendarCheck className="h-5 w-5" />} />
        <MetricCard label="Tracked spend" value={formatCurrency(totalSpend)} icon={<CreditCard className="h-5 w-5" />} />
      </section>
      <section className="grid gap-6 lg:grid-cols-2">
        <TripStatusChart data={statusData.length ? statusData : [{ status: "PLANNED", count: trips.length }]} />
        <BudgetChart data={spendData.length ? spendData : [{ name: "Planned", value: 1 }]} />
      </section>
      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-ink">Upcoming trips</h2>
        </div>
        {trips.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {trips.slice(0, 6).map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        ) : (
          <EmptyState title="No trips yet" message="Create your first trip and Safargo will help plan the rest." />
        )}
      </section>
    </div>
  );
}
