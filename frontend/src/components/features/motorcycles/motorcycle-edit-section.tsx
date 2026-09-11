import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { MotorcycleForm } from "./motorcycle-form";
import { getMotorcycle, updateMotorcycle } from "@/services/motorcycle-api";
import type { Motorcycle, MotorcycleInput } from "@/types/motorcycle";

export function MotorcycleEditSection({ id }: { id: string }) {
  const nav = useNavigate();
  const [item, setItem] = useState<Motorcycle>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    getMotorcycle(id)
      .then(setItem)
      .catch((e) => setError(e.message || "Motorcycle not found."))
      .finally(() => setLoading(false));
  }, [id]);
  const save = async (data: MotorcycleInput) => {
    try {
      await updateMotorcycle(id, data);
      nav(`/admin/motorcycles/${id}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unable to update motorcycle.");
    }
  };
  return (
    <>
      <PageHeader
        title="Update Motorcycle"
        description="Edit motorcycle information."
      />
      <Card>
        <CardContent>
          {loading ? (
            <div className="h-80 animate-pulse rounded-xl bg-slate-100" />
          ) : error ? (
            <div className="rounded-lg bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : (
            item && (
              <MotorcycleForm
                initialValues={item}
                submitLabel="Save Changes"
                onSubmit={save}
                onCancel={() => nav(`/admin/motorcycles/${id}`)}
              />
            )
          )}
        </CardContent>
      </Card>
    </>
  );
}
