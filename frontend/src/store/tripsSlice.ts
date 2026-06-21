import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { tripService } from "../services/tripService";
import type { CreateTripInput, Trip } from "../types";

type TripsState = {
  items: Trip[];
  status: "idle" | "loading" | "error";
  error: string | null;
};

const initialState: TripsState = {
  items: [],
  status: "idle",
  error: null
};

export const fetchTrips = createAsyncThunk("trips/fetch", async () => tripService.list());
export const createTrip = createAsyncThunk("trips/create", async (input: CreateTripInput) => tripService.create(input));

const tripsSlice = createSlice({
  name: "trips",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrips.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTrips.fulfilled, (state, action) => {
        state.items = action.payload.trips;
        state.status = "idle";
      })
      .addCase(createTrip.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addMatcher(isAnyOf(fetchTrips.rejected, createTrip.rejected), (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? "Trip action failed";
      });
  }
});

export default tripsSlice.reducer;
