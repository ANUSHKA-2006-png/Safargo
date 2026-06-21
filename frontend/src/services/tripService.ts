import { api, unwrap } from "./api";
import type { CreateTripInput, Pagination, Trip } from "../types";

export const tripService = {
  list: () => unwrap<{ trips: Trip[]; pagination: Pagination }>(api.get("/trips")),
  create: (input: CreateTripInput) => unwrap<Trip>(api.post("/trips", input)),
  update: (id: string, input: Partial<CreateTripInput>) => unwrap<Trip>(api.patch(`/trips/${id}`, input)),
  remove: (id: string) => unwrap<{ deleted: boolean }>(api.delete(`/trips/${id}`))
};
