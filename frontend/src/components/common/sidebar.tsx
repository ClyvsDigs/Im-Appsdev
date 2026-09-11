import { NavLink } from "react-router";
import { cn } from "@/lib/cn";

const links = [
  ["/admin/dashboard", "Dashboard", "▦"],
  ["/admin/motorcycles", "Motorcycles", "🏍"],
  ["/admin/info", "Shop Info", "ⓘ"],
];
export function Sidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-30 bg-slate-950/40 lg:hidden",
          open ? "block" : "hidden",
        )}
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen w-64 bg-slate-950 text-white transition-transform lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-5">
          <div className="grid size-9 place-items-center rounded-xl bg-white text-lg text-slate-950">
            🏍
          </div>
          <div>
            <p className="font-black">
              Moto<span className="text-slate-300">Shop</span>
            </p>
            <p className="text-[10px] uppercase tracking-[.2em] text-slate-400">
              Admin Panel
            </p>
          </div>
          <button
            className="ml-auto lg:hidden text-slate-400"
            onClick={onClose}
          >
            ✕
          </button>
        </div>
        <nav className="space-y-1 p-3">
          {links.map(([to, label, icon]) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition",
                  isActive
                    ? "bg-white text-slate-950"
                    : "text-slate-300 hover:bg-white/10 hover:text-white",
                )
              }
            >
              <span className="w-6 text-center">{icon}</span>
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-5 left-5 right-5 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs font-semibold text-white">Administrator</p>
          <p className="mt-1 text-xs text-slate-400">
            Inventory management access
          </p>
        </div>
      </aside>
    </>
  );
}
