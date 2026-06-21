import { useState } from "react";
import { useForm } from "react-hook-form";
import { Calculator } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { aiService } from "../../services/aiService";

type BudgetForm = {
  destination: string;
  travelers: number;
  nights: number;
  budget: number;
  currency: string;
  priorities: string;
};

type BudgetResult = {
  allocation: Record<string, number>;
  savings: string[];
  warnings: string[];
  dailyTarget: number;
};

export function BudgetPlanner() {
  const [result, setResult] = useState<BudgetResult | null>(null);
  const { register, handleSubmit, formState } = useForm<BudgetForm>({
    defaultValues: { travelers: 2, nights: 5, currency: "USD", priorities: "comfort, food, experiences" }
  });

  const submit = async (values: BudgetForm) => {
    const response = await aiService.budget<BudgetResult>({
      ...values,
      travelers: Number(values.travelers),
      nights: Number(values.nights),
      budget: Number(values.budget),
      priorities: values.priorities.split(",").map((item) => item.trim()).filter(Boolean)
    });
    setResult(response.result);
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[420px_1fr]">
      <form onSubmit={handleSubmit(submit)} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-xl font-bold text-ink">Budget optimizer</h2>
        <div className="mt-5 grid gap-4">
          <Input label="Destination" {...register("destination", { required: true })} />
          <Input label="Travelers" type="number" min={1} {...register("travelers", { valueAsNumber: true })} />
          <Input label="Nights" type="number" min={1} {...register("nights", { valueAsNumber: true })} />
          <Input label="Budget" type="number" min={1} {...register("budget", { valueAsNumber: true })} />
          <Input label="Currency" maxLength={3} {...register("currency")} />
          <Input label="Priorities" {...register("priorities")} />
          <Button type="submit" loading={formState.isSubmitting} icon={<Calculator className="h-4 w-4" />}>
            Optimize
          </Button>
        </div>
      </form>
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-semibold text-ink">Optimized plan</h3>
        {result ? (
          <div className="mt-4 grid gap-5">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {Object.entries(result.allocation).map(([label, value]) => (
                <div key={label} className="rounded-md bg-slate-50 p-4">
                  <p className="text-sm capitalize text-slate-500">{label}</p>
                  <p className="mt-1 text-xl font-bold text-ink">{value}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-ink">Savings moves</p>
              <ul className="mt-2 list-inside list-disc text-sm text-slate-700">
                {result.savings.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <p className="mt-4 text-sm text-slate-600">Run an optimization to see allocation, savings options, warnings, and daily targets.</p>
        )}
      </section>
    </div>
  );
}
