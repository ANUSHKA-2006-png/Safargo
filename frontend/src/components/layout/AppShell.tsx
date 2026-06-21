import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { useAuth } from "../../hooks/useAuth";
import { loadMe } from "../../store/authSlice";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

export function AppShell() {
  const dispatch = useAppDispatch();
  const { accessToken, user } = useAuth();

  useEffect(() => {
    if (accessToken && !user) void dispatch(loadMe());
  }, [accessToken, dispatch, user]);

  return (
    <div className="min-h-screen bg-[#f6f8fb]">
      <div className="flex">
        <Sidebar />
        <main className="min-w-0 flex-1">
          <Topbar />
          <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
