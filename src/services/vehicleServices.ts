import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { VehicleRegister } from "$utils/vehicle.utils";

export async function addVehicleService(
  vehicle: VehicleRegister
): Promise<response> {
  try {
    const createdVehicle = await prisma.vehicle.create({
      data: {
        ...vehicle,
      },
    });

    const fuelUpdateData = {
      userId: createdVehicle.userId,
      vehicleId: createdVehicle.id,
      fuelTypeId: createdVehicle.initialFuelTypeId,
      fuelGaugeBefore: createdVehicle.initialFuelGauge,
      fuelGaugeAfter: createdVehicle.maxFuelGauge,
      refuelAmount: createdVehicle.maxFuelCapacity,
      refuelDate: createdVehicle.createdAt,
      currentOdometer: createdVehicle.initialOdometer,
    };

    await prisma.fuelUpdate.create({
      data: {
        ...fuelUpdateData,
      },
    });

    return {
      status: true,
      data: { vehicle: createdVehicle },
      message: "Add Vehicle Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Add Vehicle Failed",
      error: String(err),
    };
  }
}

export async function getVehicleService(userId: number): Promise<response> {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: {
        userId,
      },
    });

    return { status: true, data: { vehicles }, message: "Get Vehicle Success" };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Vehicle Failed",
      error: String(err),
    };
  }
}
