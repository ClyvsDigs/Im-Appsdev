
import { useEffect, useState } from "react";
import { MotorcycleCreateSection } from "@/components/features/motorcycles/motorcycle-create-section";
import { PageLoading } from "@/components/common/page-loading";

export default function AddNewMotorcycle() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <PageLoading />;
  }

  return <MotorcycleCreateSection />;
}

