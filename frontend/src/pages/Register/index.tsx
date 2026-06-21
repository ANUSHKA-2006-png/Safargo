import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { UserPlus } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { registerUser } from "../../store/authSlice";
import type { RegisterInput } from "../../services/authService";

export function Register() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<RegisterInput>({ defaultValues: { travelStyle: "balanced" } });

  const submit = async (values: RegisterInput) => {
    await dispatch(registerUser({ ...values, homeAirport: values.homeAirport?.toUpperCase() })).unwrap();
    navigate("/dashboard", { replace: true });
  };

  return (
    <main className="grid min-h-screen place-items-center bg-[#f6f8fb] px-4 py-10">
      <form onSubmit={handleSubmit(submit)} className="w-full max-w-2xl rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">Create your Safargo account</h1>
        <p className="mt-1 text-sm text-slate-600">Set travel preferences once and use them across every trip.</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Input label="Full name" error={errors.name?.message} {...register("name", { required: "Name is required" })} />
          <Input label="Email" type="email" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
          <Input label="Password" type="password" error={errors.password?.message} {...register("password", { required: "Password is required", minLength: 10 })} />
          <Input label="Phone" {...register("phone")} />
          <Input label="Home airport" maxLength={3} {...register("homeAirport")} />
          <Input label="Travel style" {...register("travelStyle")} />
        </div>
        <Button className="mt-6" type="submit" loading={isSubmitting} icon={<UserPlus className="h-4 w-4" />}>
          Create account
        </Button>
        <p className="mt-5 text-sm text-slate-600">
          Already registered?{" "}
          <Link className="font-semibold text-ocean" to="/login">
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
