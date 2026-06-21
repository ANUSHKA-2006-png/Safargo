import { LogOut, Menu } from "lucide-react";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAuth } from "../../hooks/useAuth";
import { logoutLocal } from "../../store/authSlice";
import { Button } from "../common/Button";

export function Topbar() {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <button className="focus-ring rounded-md p-2 lg:hidden" type="button" aria-label="Open navigation">
        <Menu className="h-5 w-5" />
      </button>
      <div>
        <p className="text-sm text-slate-500">Welcome back</p>
        <h1 className="text-lg font-semibold text-ink">{user?.name ?? "Traveler"}</h1>
      </div>
      <Button variant="ghost" icon={<LogOut className="h-4 w-4" />} onClick={() => dispatch(logoutLocal())}>
        Sign out
      </Button>
    </header>
  );
}
