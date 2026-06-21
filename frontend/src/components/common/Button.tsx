import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react";
import { classNames } from "../../utils/formatters";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  loading?: boolean;
  icon?: ReactNode;
};

const variants = {
  primary: "bg-ocean text-white hover:bg-[#155985]",
  secondary: "bg-white text-ink border border-slate-200 hover:bg-slate-50",
  ghost: "text-slate-700 hover:bg-slate-100",
  danger: "bg-coral text-white hover:bg-[#e35b51]"
};

export function Button({ className, children, variant = "primary", loading, icon, disabled, ...props }: ButtonProps) {
  return (
    <button
      className={classNames(
        "focus-ring inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition",
        variants[variant],
        disabled || loading ? "cursor-not-allowed opacity-60" : "",
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}
