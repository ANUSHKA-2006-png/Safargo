import { forwardRef, InputHTMLAttributes } from "react";
import { classNames } from "../../utils/formatters";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(({ label, error, className, ...props }, ref) => (
  <label className="block">
    <span className="text-sm font-medium text-slate-700">{label}</span>
    <input
      ref={ref}
      className={classNames(
        "focus-ring mt-1 h-11 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-ink shadow-sm",
        error ? "border-coral" : "",
        className
      )}
      {...props}
    />
    {error ? <span className="mt-1 block text-xs text-coral">{error}</span> : null}
  </label>
));

Input.displayName = "Input";
