import { api, unwrap } from "./api";
import type { AnalyticsOverview } from "../types";

export const analyticsService = {
  overview: () => unwrap<AnalyticsOverview>(api.get("/analytics/overview")),
  track: (name: string, properties?: Record<string, unknown>) =>
    unwrap(api.post("/analytics/events", { name, properties: properties ?? {} }))
};
