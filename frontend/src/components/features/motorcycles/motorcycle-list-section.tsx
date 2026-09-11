
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import type { Motorcycle } from "@/types/motorcycle";
import { getMotorcycles, deleteMotorcycle } from "@/services/motorcycle-api";
import { PageHeader } from "@/components/common/page-header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MotorcycleTable } from "./motorcycle-table";
import { MotorcycleCard } from "./motorcycle-card";
import { DeleteMotorcycleModal } from "./delete-motorcycle-modal";

export function MotorcycleListSection() {
  const nav = useNavigate();

  const [items, setItems] = useState<Motorcycle[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageLoading, setPageLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<Motorcycle | null>(null);
  const [deleting, setDeleting] = useState(false);

  const load = () => {
    setLoading(true);
    getMotorcycles()
      .then(setItems)
      .catch((e) => setError(e.message || "Unable to load motorcycles."))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = items.filter((m) =>
    `${m.brand} ${m.model} ${m.year} ${m.engineNumber} ${m.plateNumber}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );

  const remove = async () => {
    if (!selected) return;

    setDeleting(true);

    try {
      await deleteMotorcycle(selected.id);
      setSelected(null);
      load();
    } catch {
      setError("Unable to delete motorcycle.");
    } finally {
      setDeleting(false);
    }
  };

  const handleAddMotorcycle = () => {
    setPageLoading(true);

    setTimeout(() => {
      nav("/admin/motorcycles/add");
    }, 500);
  };

  if (pageLoading) {
    return <PageLoading />;
  }

  return (
    <>
      <PageHeader
        title="Motorcycles"
        description="Manage your motorcycle inventory."
        action={
          <Button onClick={handleAddMotorcycle}>
            ＋ Add Motorcycle
          </Button>
        }
      />

      <Card className="overflow-hidden">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Input
              placeholder="Search motorcycles..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <p className="text-xs text-slate-400">
            {filtered.length} of {items.length} motorcycles
          </p>
        </div>

        {error && (
          <div className="m-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading ? (
          <div className="space-y-3 p-5">
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
            <div className="h-12 animate-pulse rounded-lg bg-slate-100" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-10 text-center">
            <p className="font-bold text-slate-700">
              No motorcycles found
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {query
                ? "Try another search."
                : "Add your first motorcycle to get started."}
            </p>
          </div>
        ) : (
          <>
            <div className="hidden md:block">
              <MotorcycleTable
                items={filtered}
                onDelete={setSelected}
              />
            </div>

            <div className="grid gap-4 p-4 md:hidden">
              {filtered.map((m) => (
                <MotorcycleCard
                  key={m.id}
                  motorcycle={m}
                  onDelete={setSelected}
                />
              ))}
            </div>
          </>
        )}
      </Card>

      <DeleteMotorcycleModal
        motorcycle={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onConfirm={remove}
        loading={deleting}
      />
    </>
  );
}

export function PageLoading() {
  return (
    <section className="h-screen flex justify-center items-center flex-col gap-4">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif"
        alt="Loading"
        className="w-10 h-10"
      />
      Loading...
    </section>
  );
}



