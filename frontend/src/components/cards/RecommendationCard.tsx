export type Recommendation = {
  destination: string;
  country: string;
  why: string;
  estimatedDailyBudget?: number;
  confidence?: number;
};

export function RecommendationCard({ recommendation }: { recommendation: Recommendation }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-ink">{recommendation.destination}</h3>
          <p className="text-sm text-slate-500">{recommendation.country}</p>
        </div>
        {recommendation.confidence ? (
          <span className="rounded-full bg-amber/20 px-3 py-1 text-xs font-semibold text-ink">
            {Math.round(recommendation.confidence * 100)}%
          </span>
        ) : null}
      </div>
      <p className="mt-3 text-sm text-slate-700">{recommendation.why}</p>
      {recommendation.estimatedDailyBudget ? (
        <p className="mt-4 text-sm font-semibold text-ocean">${recommendation.estimatedDailyBudget}/day estimate</p>
      ) : null}
    </article>
  );
}
