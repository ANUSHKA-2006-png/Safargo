import { useEffect, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { MetricCard } from "../../components/cards/MetricCard";
import { useAuth } from "../../hooks/useAuth";
import { analyticsService } from "../../services/analyticsService";
import type { AnalyticsOverview } from "../../types";

export function Admin() {
  const { user } = useAuth();
  const [overview, setOverview] = useState<AnalyticsOverview | null>(null);

  useEffect(() => {
    analyticsService.overview().then(setOverview).catch(() => setOverview(null));
  }, []);

  if (user?.role !== "ADMIN") {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-ink">Admin</h2>
        <p className="mt-2 text-sm text-slate-600">Your account does not have administrator permissions.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6">
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ocean">
          <ShieldCheck className="h-4 w-4" />
          Admin console
        </p>
        <h2 className="mt-1 text-2xl font-bold text-ink">Platform insights</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard label="Your trips" value={overview?.trips.total ?? 0} />
        <MetricCard label="Upcoming" value={overview?.trips.upcoming ?? 0} />
        <MetricCard label="Bookings tracked" value={overview?.bookings.total ?? 0} />
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-ink">Operational checklist</h3>
        <ul className="mt-3 list-inside list-disc text-sm leading-7 text-slate-700">
          <li>Review API logs in the backend Winston stream.</li>
          <li>Monitor Redis hit rates for AI caching.</li>
          <li>Rotate JWT secrets and AI keys through the deployment secret manager.</li>
        </ul>
      </div>
    </div>
  );
}
