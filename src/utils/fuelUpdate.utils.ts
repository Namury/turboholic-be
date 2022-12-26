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

export interface summaryData{
  fuelType: string,
  fuelPrice: number,
  fuelSavingsLiter: number|null,
  fuelSavingRupiah: number|null,
  currentFuelUsage: number|null,
  totalDistance: number,
}

export function round(value:number, precision?:number) {
  const multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

export interface dateFilterType {
  gte: Date;
  lte: Date;
}
