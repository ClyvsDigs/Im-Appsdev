import api from "@/lib/axios";
import type { Motorcycle, MotorcycleInput } from "@/types/motorcycle";

export async function getMotorcycles(): Promise<Motorcycle[]> {
  const { data } = await api.get<Motorcycle[]>("/motorcycles");
  return data;
}

export async function getMotorcycle(id: string): Promise<Motorcycle> {
  const { data } = await api.get<Motorcycle>(`/motorcycles/${id}`);
  return data;
}

export async function createMotorcycle(
  input: MotorcycleInput
): Promise<Motorcycle> {
  const { data } = await api.post<Motorcycle>("/motorcycles", input);
  return data;
}

export async function updateMotorcycle(
  id: string,
  input: MotorcycleInput
): Promise<Motorcycle> {
  const { data } = await api.put<Motorcycle>(
    `/motorcycles/${id}`,
    input
  );

  return data;
}

export async function deleteMotorcycle(id: string): Promise<void> {
  await api.delete(`/motorcycles/${id}`);
}