import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import MainLayout from "@/layouts/main-layout";
import Dashboard from "@/pages/admin/dashboard/dashboard";
import Motorcycles from "@/pages/admin/motorcycles/motorcycles";
import AddNewMotorcycle from "@/pages/admin/motorcycles/add-new-motorcycle";
import MotorcycleDetails from "@/pages/admin/motorcycles/motorcycle-details";
import UpdateMotorcycle from "@/pages/admin/motorcycles/update-motorcycle";
import Info from "@/pages/admin/info/info";
import { PageLoading } from "@/components/common/page-loading";

export default function App() {
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

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/motorcycles" element={<Motorcycles />} />
        <Route path="/admin/motorcycles/add" element={<AddNewMotorcycle />} />
        <Route path="/admin/motorcycles/:id" element={<MotorcycleDetails />} />
        <Route
          path="/admin/motorcycles/:id/edit"
          element={<UpdateMotorcycle />}
        />
        <Route path="/admin/info" element={<Info />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
}