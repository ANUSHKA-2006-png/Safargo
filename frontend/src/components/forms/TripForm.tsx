import { useForm } from "react-hook-form";
import { Plus } from "lucide-react";
import type { CreateTripInput } from "../../types";
import { Button } from "../common/Button";
import { Input } from "../common/Input";

type TripFormValues = CreateTripInput & {
  interests: string;
};

export function TripForm({ onSubmit, loading }: { onSubmit: (values: CreateTripInput) => void; loading?: boolean }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TripFormValues>({
    defaultValues: { travelers: 1, currency: "USD", interests: "food, culture, nature" }
  });

  const submit = (values: TripFormValues) => {
    onSubmit({
      ...values,
      budget: values.budget ? Number(values.budget) : undefined,
      travelers: Number(values.travelers),
      preferences: {
        interests: values.interests.split(",").map((item) => item.trim()).filter(Boolean)
      }
    });
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="grid gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-2">
      <Input label="Trip title" error={errors.title?.message} {...register("title", { required: "Trip title is required" })} />
      <Input label="Destination" error={errors.destination?.message} {...register("destination", { required: "Destination is required" })} />
      <Input label="Start date" type="date" error={errors.startDate?.message} {...register("startDate", { required: "Start date is required" })} />
      <Input label="End date" type="date" error={errors.endDate?.message} {...register("endDate", { required: "End date is required" })} />
      <Input label="Travelers" type="number" min={1} {...register("travelers", { valueAsNumber: true, min: 1 })} />
      <Input label="Budget" type="number" min={0} step="0.01" {...register("budget", { valueAsNumber: true })} />
      <Input label="Currency" maxLength={3} {...register("currency")} />
      <Input label="Interests" {...register("interests")} />
      <div className="md:col-span-2">
        <Button type="submit" loading={loading} icon={<Plus className="h-4 w-4" />}>
          Create trip
        </Button>
      </div>
    </form>
  );
}
