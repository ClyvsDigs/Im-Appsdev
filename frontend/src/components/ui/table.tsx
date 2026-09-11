import type { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Table = ({
  className,
  ...p
}: HTMLAttributes<HTMLTableElement>) => (
  <div className="w-full overflow-x-auto">
    <table className={cn("w-full text-left text-sm", className)} {...p} />
  </div>
);
export const THead = ({
  className,
  ...p
}: HTMLAttributes<HTMLTableSectionElement>) => (
  <thead
    className={cn(
      "bg-slate-50 text-xs uppercase tracking-wide text-slate-500",
      className,
    )}
    {...p}
  />
);
export const TH = ({
  className,
  ...p
}: ThHTMLAttributes<HTMLTableCellElement>) => (
  <th className={cn("px-4 py-3 font-semibold", className)} {...p} />
);
export const TD = ({
  className,
  ...p
}: TdHTMLAttributes<HTMLTableCellElement>) => (
  <td className={cn("px-4 py-3 align-middle", className)} {...p} />
);
