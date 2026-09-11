import { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/page-header";
import { DashboardStats } from "./dashboard-stats";
import { RecentMotorcycles } from "./recent-motorcycles";
import { getMotorcycles } from "@/services/motorcycle-api";
import type { Motorcycle } from "@/types/motorcycle";

export function DashboardSection() {
  const [items, setItems] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getMotorcycles()
      .then(setItems)
      .finally(() => setLoading(false));
  }, []);
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Overview of your motorcycle inventory."
      />
      <div className="space-y-6">
        {loading ? (
          <div className="h-32 animate-pulse rounded-2xl bg-slate-200" />
        ) : (
          <>
            <DashboardStats motorcycles={items} />
            <RecentMotorcycles motorcycles={items} />
          </>
        )}
      </div>
    </>
  );
}
