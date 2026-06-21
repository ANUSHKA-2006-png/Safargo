import { Loader2 } from "lucide-react";

export function LoadingState({ label = "Loading" }: { label?: string }) {
  return (
    <div className="flex min-h-40 items-center justify-center gap-3 text-sm text-slate-600">
      <Loader2 className="h-5 w-5 animate-spin text-ocean" />
      <span>{label}</span>
    </div>
  );
}
