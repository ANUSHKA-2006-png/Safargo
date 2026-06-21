import { CalendarDays, UsersRound } from "lucide-react";
import type { Trip } from "../../types";
import { formatCurrency, formatDate } from "../../utils/formatters";

export function TripCard({ trip }: { trip: Trip }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-ink">{trip.title}</h3>
          <p className="text-sm text-slate-600">{trip.destination}</p>
        </div>
        <span className="rounded-full bg-mint/10 px-3 py-1 text-xs font-semibold text-mint">{trip.status}</span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-slate-600">
        <span className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4" />
          {formatDate(trip.startDate)} to {formatDate(trip.endDate)}
        </span>
        <span className="flex items-center gap-2">
          <UsersRound className="h-4 w-4" />
          {trip.travelers} traveler{trip.travelers > 1 ? "s" : ""}
        </span>
      </div>
      <p className="mt-4 text-sm font-semibold text-ink">{formatCurrency(trip.budget, trip.currency)}</p>
    </article>
  );
}
