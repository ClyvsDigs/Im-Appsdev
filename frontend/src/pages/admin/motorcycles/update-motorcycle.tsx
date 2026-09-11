
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { MotorcycleEditSection } from "@/components/features/motorcycles/motorcycle-edit-section";
import { PageLoading } from "@/components/common/page-loading";

export default function UpdateMotorcycle() {
  const { id = "" } = useParams();
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

  return <MotorcycleEditSection id={id} />;
}

