import { useEffect, useState } from "react";
import type {
  Motorcycle,
  MotorcycleInput,
  FuelType,
  Transmission,
} from "@/types/motorcycle";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  initialValues?: Partial<Motorcycle>;
  submitLabel?: string;
  onSubmit: (data: MotorcycleInput) => Promise<void> | void;
  onCancel?: () => void;
};
const empty: MotorcycleInput = {
  brand: "",
  year: new Date().getFullYear(),
  model: "",
  engineNumber: "",
  engineDisplacement: 0,
  fuelType: "Gasoline",
  plateNumber: "",
  chassisNumber: "",
  transmission: "Manual",
  fuelCapacity: 0,
  color: "",
  price: 0,
  motorcyclePicture: "",
  mileage: 0,
  description: "",
};
const fields = [
  ["brand", "Brand"],
  ["model", "Model"],
  ["engineNumber", "Engine Number"],
  ["plateNumber", "Plate Number"],
  ["chassisNumber", "Chassis Number"],
  ["color", "Color"],
] as const;
export function MotorcycleForm({
  initialValues,
  submitLabel = "Save Motorcycle",
  onSubmit,
  onCancel,
}: Props) {
  const [form, setForm] = useState<MotorcycleInput>({
    ...empty,
    ...initialValues,
  });
  const [preview, setPreview] = useState(
    initialValues?.motorcyclePicture || "",
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    setForm({ ...empty, ...initialValues });
    setPreview(initialValues?.motorcyclePicture || "");
  }, [initialValues]);
  const set = (key: keyof MotorcycleInput, value: string | number) =>
    setForm((f) => ({ ...f, [key]: value }));
  const file = (file?: File) => {
    if (!file) return;
    const isJpg = file.type === "image/jpeg" || /\.jpe?g$/i.test(file.name);
    if (!isJpg) {
      setErrors((e) => ({
        ...e,
        motorcyclePicture: "Only JPG and JPEG image files are allowed.",
      }));
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setErrors((e) => ({
        ...e,
        motorcyclePicture: "Image must be 2 MB or smaller.",
      }));
      return;
    }
    setErrors((e) => ({ ...e, motorcyclePicture: "" }));
    const reader = new FileReader();
    reader.onload = () => {
      const result = String(reader.result);
      set("motorcyclePicture", result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };
  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const e2: Record<string, string> = {};
    for (const [key, label] of fields)
      if (!String(form[key]).trim()) e2[key] = `${label} is required.`;
    if (
      !form.year ||
      form.year < 1900 ||
      form.year > new Date().getFullYear() + 1
    )
      e2.year = "Enter a valid year.";
    if (form.engineDisplacement <= 0)
      e2.engineDisplacement = "Must be greater than 0.";
    if (form.fuelCapacity <= 0) e2.fuelCapacity = "Must be greater than 0.";
    if (form.mileage < 0) e2.mileage = "Cannot be negative.";
    if (form.price <= 0) e2.price = "Price must be greater than 0.";
    if (!form.motorcyclePicture)
      e2.motorcyclePicture = "Motorcycle picture is required.";
    setErrors(e2);
    if (Object.keys(e2).length) return;
    await onSubmit(form);
  }
  const err = (k: string) =>
    errors[k] && (
      <p className="mt-1 text-xs font-medium text-red-600">{errors[k]}</p>
    );
  const text = (key: (typeof fields)[number][0], label: string) => (
    <label className="block text-sm font-semibold text-slate-700">
      {label}
      <Input
        className="mt-1.5"
        value={String(form[key])}
        onChange={(e) => set(key, e.target.value)}
      />
      {err(key)}
    </label>
  );
  return (
    <form onSubmit={submit} className="space-y-6">
      <div className="grid gap-5 md:grid-cols-2">
        {fields.map(([k, l]) => text(k, l))}
        <label className="block text-sm font-semibold text-slate-700">
          Year
          <Input
            className="mt-1.5"
            type="number"
            value={form.year}
            onChange={(e) => set("year", Number(e.target.value))}
          />
          {err("year")}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Engine Displacement (cc)
          <Input
            className="mt-1.5"
            type="number"
            min="1"
            value={form.engineDisplacement || ""}
            onChange={(e) => set("engineDisplacement", Number(e.target.value))}
          />
          {err("engineDisplacement")}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Fuel Type
          <select
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
            value={form.fuelType}
            onChange={(e) => set("fuelType", e.target.value as FuelType)}
          >
            <option>Gasoline</option>
            <option>Diesel</option>
            <option>Electric</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Transmission
          <select
            className="mt-1.5 w-full rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-sm"
            value={form.transmission}
            onChange={(e) =>
              set("transmission", e.target.value as Transmission)
            }
          >
            <option>Manual</option>
            <option>Automatic</option>
            <option>Semi-Automatic</option>
          </select>
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Fuel Capacity (L)
          <Input
            className="mt-1.5"
            type="number"
            step="0.1"
            min="0"
            value={form.fuelCapacity || ""}
            onChange={(e) => set("fuelCapacity", Number(e.target.value))}
          />
          {err("fuelCapacity")}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Mileage (km)
          <Input
            className="mt-1.5"
            type="number"
            min="0"
            value={form.mileage}
            onChange={(e) => set("mileage", Number(e.target.value))}
          />
          {err("mileage")}
        </label>
        <label className="block text-sm font-semibold text-slate-700">
          Price (₱)
          <Input
            className="mt-1.5"
            type="number"
            min="1"
            step="0.01"
            value={form.price || ""}
            onChange={(e) => set("price", Number(e.target.value))}
            placeholder="e.g. 125000"
          />
          <p className="mt-1 text-xs text-slate-400">
            Preview: ₱{(form.price || 0).toLocaleString("en-PH")}
          </p>
          {err("price")}
        </label>
      </div>
      <label className="block text-sm font-semibold text-slate-700">
        Motorcycle Picture{" "}
        <span className="font-normal text-slate-400">(JPG/JPEG, max 2 MB)</span>
        <Input
          className="mt-1.5 cursor-pointer"
          type="file"
          accept=".jpg,.jpeg,image/jpeg"
          onChange={(e) => file(e.target.files?.[0])}
        />
        {err("motorcyclePicture")}
      </label>
      {preview && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-slate-50 p-2">
          <img
            src={preview}
            className="h-56 w-full rounded-lg object-contain"
            alt="Motorcycle preview"
          />
        </div>
      )}
      <label className="block text-sm font-semibold text-slate-700">
        Description
        <textarea
          className="mt-1.5 min-h-28 w-full rounded-lg border border-slate-200 px-3.5 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-100"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          placeholder="Describe the motorcycle..."
        />
      </label>
      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit">{submitLabel}</Button>
      </div>
    </form>
  );
}
