export type TrackEventDto = {
  name: string;
  properties?: Record<string, unknown>;
};

export type AnalyticsRangeQueryDto = {
  from?: Date;
  to?: Date;
};
