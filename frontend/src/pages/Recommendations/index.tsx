import { useState } from "react";
import { useForm } from "react-hook-form";
import { Compass } from "lucide-react";
import { Recommendation, RecommendationCard } from "../../components/cards/RecommendationCard";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { aiService } from "../../services/aiService";

type RecommendationForm = {
  origin: string;
  month: string;
  travelers: number;
  budget?: number;
  interests: string;
  climate: string;
};

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { register, handleSubmit, formState } = useForm<RecommendationForm>({
    defaultValues: { travelers: 2, interests: "food, culture, beaches", climate: "mild" }
  });

  const submit = async (values: RecommendationForm) => {
    const response = await aiService.recommendations<{ recommendations: Recommendation[] }>({
      ...values,
      travelers: Number(values.travelers),
      budget: values.budget ? Number(values.budget) : undefined,
      interests: values.interests.split(",").map((item) => item.trim()).filter(Boolean)
    });
    setRecommendations(response.result.recommendations);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <form onSubmit={handleSubmit(submit)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-ink">Destination recommendations</h2>
        <div className="mt-5 grid gap-4">
          <Input label="Origin" {...register("origin")} />
          <Input label="Month" {...register("month")} />
          <Input label="Travelers" type="number" min={1} {...register("travelers", { valueAsNumber: true })} />
          <Input label="Budget" type="number" min={0} {...register("budget", { valueAsNumber: true })} />
          <Input label="Interests" {...register("interests", { required: true })} />
          <Input label="Climate" {...register("climate")} />
          <Button type="submit" loading={formState.isSubmitting} icon={<Compass className="h-4 w-4" />}>
            Recommend
          </Button>
        </div>
      </form>
      <section className="grid content-start gap-4">
        {recommendations.length ? (
          recommendations.map((recommendation) => (
            <RecommendationCard key={`${recommendation.destination}-${recommendation.country}`} recommendation={recommendation} />
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            Tune your interests and budget to generate ranked destination ideas.
          </div>
        )}
      </section>
    </div>
  );
}
