import { useParams } from "react-router";
import { MotorcycleDetailsSection } from "@/components/features/motorcycles/motorcycle-details-section";

export default function MotorcycleDetails() {
  const { id = "" } = useParams();
  return <MotorcycleDetailsSection id={id} />;
}
