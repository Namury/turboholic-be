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

export interface dateFilterType {
  gte: Date;
  lte: Date;
}
