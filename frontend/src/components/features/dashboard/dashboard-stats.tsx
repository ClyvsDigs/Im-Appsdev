import { Card } from "@/components/ui/card";
import type { Motorcycle } from "@/types/motorcycle";

export function DashboardStats({ motorcycles }: { motorcycles: Motorcycle[] }) {
  const total = motorcycles.length,
    available = motorcycles.filter((m) => m.mileage >= 0).length,
    // out = 0,
    value = motorcycles.reduce((s, m) => s + m.price, 0);
  const stats = [
    ["Total Motorcycles", total, "All registered units", "▦"],
    ["Available Stock", available, "Ready for sale", "✓"],
    //["Out of Stock", out, "Currently unavailable", "!"],//
    [
      "Total Inventory Value",
      `₱${value.toLocaleString("en-PH")}`,
      "Current listed prices",
      "₱",
    ],
  ];
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(([label, value, sub, icon]) => (
        <Card key={label} className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">{label}</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
              <p className="mt-1 text-xs text-slate-400">{sub}</p>
            </div>
            <div className="grid size-10 place-items-center rounded-xl bg-slate-100 text-lg">
              {icon}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
