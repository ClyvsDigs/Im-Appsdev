import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";

export default function Info() {
  return (
    <>
      <PageHeader
        title="Shop Info"
        description="About this motorcycle shop management system."
      />
      <Card>
        <CardContent>
          <h2 className="text-lg font-black">MotoShop Administration</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
            This admin-only system helps motorcycle shop staff maintain
            motorcycle inventory, review specifications, and keep records
            organized. The frontend uses sample data by default and is ready to
            connect to a Laravel API.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Frontend</p>
              <p className="mt-1 font-bold">React + Vite + TypeScript</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">Styling</p>
              <p className="mt-1 font-bold">Tailwind CSS</p>
            </div>
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-400">API client</p>
              <p className="mt-1 font-bold">Axios</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
