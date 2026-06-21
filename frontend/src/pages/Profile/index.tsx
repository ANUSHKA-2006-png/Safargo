import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Save } from "lucide-react";
import { Button } from "../../components/common/Button";
import { Input } from "../../components/common/Input";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAuth } from "../../hooks/useAuth";
import { userService, UpdateProfileInput } from "../../services/userService";
import { loadMe } from "../../store/authSlice";

export function Profile() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState } = useForm<UpdateProfileInput>();

  useEffect(() => {
    if (user) reset({ name: user.name, phone: user.phone ?? "", homeAirport: user.homeAirport ?? "", travelStyle: user.travelStyle });
  }, [reset, user]);

  const submit = async (values: UpdateProfileInput) => {
    await userService.updateMe({
      ...values,
      phone: values.phone || null,
      homeAirport: values.homeAirport ? values.homeAirport.toUpperCase() : null
    });
    await dispatch(loadMe()).unwrap();
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="max-w-2xl rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-xl font-bold text-ink">Profile</h2>
      <p className="mt-1 text-sm text-slate-600">{user?.email}</p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Input label="Full name" {...register("name")} />
        <Input label="Phone" {...register("phone")} />
        <Input label="Home airport" maxLength={3} {...register("homeAirport")} />
        <Input label="Travel style" {...register("travelStyle")} />
      </div>
      <Button className="mt-6" type="submit" loading={formState.isSubmitting} icon={<Save className="h-4 w-4" />}>
        Save profile
      </Button>
    </form>
  );
}
