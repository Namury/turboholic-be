import { FuelUpdate } from "@prisma/client";

export interface addFuelUpdate {
  userId: number;
  vehicleId: number;
  fuelTypeId: number;
  fuelGaugeBefore: number;
  fuelGaugeAfter: number;
  refuelAmount: number;
  refuelDate: Date;
  currentOdometer: number;
}

export interface kmPerLiterCalculation {
  refuelAmount: number;
  currentOdometer: number;
}

export interface chartData{
  date: string;
  total: number
}

export interface dateFilterType {
  gte: Date;
  lte: Date;
}
