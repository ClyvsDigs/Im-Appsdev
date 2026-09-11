import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import type { Motorcycle } from "@/types/motorcycle";
import { getMotorcycle, deleteMotorcycle } from "@/services/motorcycle-api";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteMotorcycleModal } from "./delete-motorcycle-modal";

export function MotorcycleDetailsSection({ id }: { id: string }) {
  const nav = useNavigate();
  const [m, setM] = useState<Motorcycle>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    getMotorcycle(id)
      .then(setM)
      .catch((e) => setError(e.message || "Motorcycle not found."))
      .finally(() => setLoading(false));
  }, [id]);
  if (loading)
    return (
      <div className="space-y-4">
        <div className="h-10 w-48 animate-pulse rounded bg-slate-200" />
        <div className="h-96 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  if (error || !m)
    return (
      <div className="rounded-xl bg-red-50 p-5 text-sm text-red-700">
        {error || "Motorcycle not found."}
      </div>
    );
  const info = [
    ["Brand", m.brand],
    ["Year", m.year],
    ["Model", m.model],
    ["Engine Number", m.engineNumber],
    ["Engine Displacement", `${m.engineDisplacement} cc`],
    ["Fuel Type", m.fuelType],
    ["Plate Number", m.plateNumber],
    ["Chassis Number", m.chassisNumber],
    ["Transmission", m.transmission],
    ["Fuel Capacity", `${m.fuelCapacity} L`],
    ["Color", m.color],
    ["Mileage", `${m.mileage.toLocaleString()} km`],
  ];
  return (
    <>
      <PageHeader
        title={`${m.brand} ${m.model}`}
        description="Motorcycle details and inventory information."
        action={
          <div className="flex gap-2">
            <Link to="/admin/motorcycles">
              <Button variant="secondary">Back</Button>
            </Link>
            <Link to={`/admin/motorcycles/${m.id}/edit`}>
              <Button>Edit</Button>
            </Link>
            <Button variant="danger" onClick={() => setDel(true)}>
              Delete
            </Button>
          </div>
        }
      />
      <div className="grid gap-6 lg:grid-cols-5">
        <Card className="overflow-hidden lg:col-span-2">
          <div className="aspect-[4/3] bg-slate-100">
            <img
              src={m.motorcyclePicture}
              alt={`${m.brand} ${m.model}`}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  {m.brand}
                </p>
                <h2 className="text-xl font-black">{m.model}</h2>
              </div>
              <Badge tone="success">Available</Badge>
            </div>
            <p className="mt-4 text-2xl font-black">
              ₱{m.price.toLocaleString("en-PH")}
            </p>
          </div>
        </Card>
        <Card className="lg:col-span-3">
          <CardContent>
            <h2 className="text-lg font-black">Motorcycle Information</h2>
            <div className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
              {info.map(([label, value]) => (
                <div key={label}>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {label}
                  </p>
                  <p className="mt-1 font-semibold text-slate-800">{value}</p>
                </div>
              ))}
            </div>
            <div className="mt-8 border-t border-slate-100 pt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Description
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600">
                {m.description || "No description provided."}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
      <DeleteMotorcycleModal
        motorcycle={m}
        open={del}
        onClose={() => setDel(false)}
        onConfirm={async () => {
          await deleteMotorcycle(m.id);
          nav("/admin/motorcycles");
        }}
      />
    </>
  );
}
