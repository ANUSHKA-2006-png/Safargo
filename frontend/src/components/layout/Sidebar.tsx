import { NavLink } from "react-router-dom";
import { Plane } from "lucide-react";
import { navigationItems } from "../../constants/navigation";
import { classNames } from "../../utils/formatters";

export function Sidebar() {
  return (
    <aside className="hidden min-h-screen w-64 border-r border-slate-200 bg-white px-4 py-5 lg:block">
      <div className="flex items-center gap-3 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ink text-white">
          <Plane className="h-5 w-5" />
        </div>
        <div>
          <p className="text-base font-bold text-ink">Safargo</p>
          <p className="text-xs text-slate-500">Smart travel ops</p>
        </div>
      </div>
      <nav className="mt-8 space-y-1">
        {navigationItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              classNames(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition",
                isActive ? "bg-ocean text-white" : "text-slate-700 hover:bg-slate-100"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
