import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { TripForm } from "../../components/forms/TripForm";
import { TripCard } from "../../components/cards/TripCard";
import { EmptyState } from "../../components/common/EmptyState";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import { createTrip, fetchTrips } from "../../store/tripsSlice";
import type { CreateTripInput } from "../../types";

export function TripPlanner() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector((state) => state.trips);

  useEffect(() => {
    void dispatch(fetchTrips());
  }, [dispatch]);

  const submit = (values: CreateTripInput) => {
    void dispatch(createTrip(values));
  };

  return (
    <div className="grid gap-6">
      <div>
        <p className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-ocean">
          <Sparkles className="h-4 w-4" />
          Trip planning
        </p>
        <h2 className="mt-1 text-2xl font-bold text-ink">Create and manage trips</h2>
      </div>
      <TripForm onSubmit={submit} loading={status === "loading"} />
      {items.length ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {items.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <EmptyState title="Your travel history is ready" message="Saved trips will appear here as soon as you create them." />
      )}
    </div>
  );
}
