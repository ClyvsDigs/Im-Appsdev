
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { PageHeader } from "@/components/common/page-header";
import { Card, CardContent } from "@/components/ui/card";
import { MotorcycleForm } from "./motorcycle-form";
import { createMotorcycle } from "@/services/motorcycle-api";
import type { MotorcycleInput } from "@/types/motorcycle";
import { PageLoading } from "@/components/common/page-loading";

export function MotorcycleCreateSection() {
  const nav = useNavigate();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  
  if (loading) {
    return <PageLoading />;
  }

  const save = async (data: MotorcycleInput) => {
    setError("");
    setSubmitting(true);

    try {
      await createMotorcycle(data);

      
      setSubmitting(true);

      
      setTimeout(() => {
        nav("/admin/motorcycles");
      }, 1500);
    } catch (e) {
      setSubmitting(false);

      setError(
        e instanceof Error
          ? e.message
          : "Unable to create motorcycle."
      );
    }
  };

  
  if (submitting) {
    return <PageLoading />;
  }

  return (
    <>
      <PageHeader
        title="Add New Motorcycle"
        description="Register a motorcycle in your inventory."
      />

      <Card>
        <CardContent>
          {error && (
            <div className="mb-5 rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <MotorcycleForm
            submitLabel="Add Motorcycle"
            onSubmit={save}
            onCancel={() => nav("/admin/motorcycles")}
          />
        </CardContent>
      </Card>
    </>
  );
}

