import { Link } from "react-router";
import type { Motorcycle } from "@/types/motorcycle";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

export function RecentMotorcycles({
  motorcycles,
}: {
  motorcycles: Motorcycle[];
}) {
  const items = [...motorcycles]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 5);
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-bold text-slate-900">Recently Added</h2>
            <p className="mt-1 text-xs text-slate-500">
              Latest motorcycles in your inventory
            </p>
          </div>
          <Link
            to="/admin/motorcycles"
            className="text-xs font-bold text-slate-700 hover:underline"
          >
            View all →
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {items.map((m) => (
            <Link
              to={`/admin/motorcycles/${m.id}`}
              key={m.id}
              className="flex items-center gap-4 px-5 py-4 hover:bg-slate-50"
            >
              <img
                src={m.motorcyclePicture}
                className="size-14 rounded-xl bg-slate-100 object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold text-slate-800">
                  {m.brand} {m.model}
                </p>
                <p className="text-xs text-slate-400">
                  {m.year} · {m.engineDisplacement}cc · {m.color}
                </p>
              </div>
              <p className="text-sm font-bold text-slate-900">
                ₱{m.price.toLocaleString()}
              </p>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
