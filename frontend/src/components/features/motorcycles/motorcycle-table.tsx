import { Link } from "react-router";
import type { Motorcycle } from "@/types/motorcycle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, THead, TH, TD } from "@/components/ui/table";

export function MotorcycleTable({
  items,
  onDelete,
}: {
  items: Motorcycle[];
  onDelete: (m: Motorcycle) => void;
}) {
  return (
    <Table>
      <THead>
        <tr>
          <TH>Motorcycle</TH>
          <TH>Specs</TH>
          <TH>Fuel</TH>
          <TH>Price</TH>
          <TH>Status</TH>
          <TH className="text-right">Actions</TH>
        </tr>
      </THead>
      <tbody className="divide-y divide-slate-100">
        {items.map((m) => (
          <tr key={m.id} className="hover:bg-slate-50">
            <TD>
              <div className="flex items-center gap-3">
                <img
                  src={m.motorcyclePicture}
                  alt=""
                  className="size-12 rounded-lg bg-slate-100 object-cover"
                />
                <div>
                  <p className="font-bold text-slate-800">
                    {m.brand} {m.model}
                  </p>
                  <p className="text-xs text-slate-400">{m.year}</p>
                </div>
              </div>
            </TD>
            <TD>
              <p className="font-medium text-slate-700">
                {m.engineDisplacement}cc
              </p>
              <p className="text-xs text-slate-400">{m.transmission}</p>
            </TD>
            <TD>{m.fuelType}</TD>
            <TD className="font-bold">₱{m.price.toLocaleString()}</TD>
            <TD>
              <Badge tone="success">Available</Badge>
            </TD>
            <TD>
              <div className="flex justify-end gap-1">
                <Link to={`/admin/motorcycles/${m.id}`}>
                  <Button size="sm" variant="ghost">
                    View
                  </Button>
                </Link>
                <Link to={`/admin/motorcycles/${m.id}/edit`}>
                  <Button size="sm" variant="ghost">
                    Edit
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:bg-red-50"
                  onClick={() => onDelete(m)}
                >
                  Delete
                </Button>
              </div>
            </TD>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}
