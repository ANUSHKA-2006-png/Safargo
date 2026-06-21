import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { login } from "../../store/authSlice";
import type { LoginInput } from "../../services/authService";

export function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname ?? "/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginInput>();

  const submit = async (values: LoginInput) => {
    await dispatch(login(values)).unwrap();
    navigate(from, { replace: true });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f8fb] px-4">
      <form onSubmit={handleSubmit(submit)} className="w-full max-w-md rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Sign in to Safargo</h1>
        <p className="mt-1 text-sm text-slate-600">Continue planning smarter trips.</p>
        <div className="mt-6 grid gap-4">
          <Input label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
          <Input label="Password" type="password" error={errors.password?.message} {...register("password", { required: "Password is required" })} />
          <Button type="submit" loading={isSubmitting} icon={<LogIn className="h-4 w-4" />}>
            Sign in
          </Button>
        </div>
        <p className="mt-5 text-sm text-slate-600">
          New here?{" "}
          <Link className="font-semibold text-ocean" to="/register">
            Create an account
          </Link>
        </p>
      </form>
    </main>
  );
}
