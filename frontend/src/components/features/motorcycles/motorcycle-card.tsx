import { Link } from "react-router";
import type { Motorcycle } from "@/types/motorcycle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function MotorcycleCard({
  motorcycle,
  onDelete,
}: {
  motorcycle: Motorcycle;
  onDelete: (m: Motorcycle) => void;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <img
        src={motorcycle.motorcyclePicture}
        alt={`${motorcycle.brand} ${motorcycle.model}`}
        className="h-48 w-full bg-slate-100 object-cover"
      />
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
              {motorcycle.brand}
            </p>
            <h3 className="mt-1 font-black text-slate-900">
              {motorcycle.model}
            </h3>
          </div>
          <Badge tone="success">Available</Badge>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-xs text-slate-500">
          <span>{motorcycle.year}</span>
          <span>{motorcycle.engineDisplacement}cc</span>
          <span>{motorcycle.fuelType}</span>
          <span>{motorcycle.transmission}</span>
        </div>
        <p className="mt-4 text-lg font-black text-slate-900">
          ₱{motorcycle.price.toLocaleString()}
        </p>
        <div className="mt-4 flex gap-2">
          <Link className="flex-1" to={`/admin/motorcycles/${motorcycle.id}`}>
            <Button className="w-full" size="sm" variant="secondary">
              View
            </Button>
          </Link>
          <Link to={`/admin/motorcycles/${motorcycle.id}/edit`}>
            <Button size="sm" variant="secondary">
              Edit
            </Button>
          </Link>
          <Button
            size="sm"
            variant="danger"
            onClick={() => onDelete(motorcycle)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}
