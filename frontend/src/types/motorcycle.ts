export type FuelType = "Gasoline" | "Diesel" | "Electric";
export type Transmission = "Manual" | "Automatic" | "Semi-Automatic";

export interface Motorcycle {
  id: string;
  brand: string;
  year: number;
  model: string;
  engineNumber: string;
  engineDisplacement: number;
  fuelType: FuelType;
  plateNumber: string;
  chassisNumber: string;
  transmission: Transmission;
  fuelCapacity: number;
  color: string;
  price: number;
  motorcyclePicture: string;
  mileage: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export type MotorcycleInput = Omit<Motorcycle, "id" | "createdAt" | "updatedAt">;
