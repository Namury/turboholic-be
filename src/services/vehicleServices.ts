import { prisma } from "$utils/prisma.utils";
import "dotenv/config";
import { response } from "$utils/response.utils";
import { VehicleRegister } from "$utils/vehicle.utils";

export async function addVehicleService(vehicle: VehicleRegister): Promise<response> {
  try {
    
    const createdVehicle = await prisma.vehicle.create({
      data: {
        ...vehicle,
      }
    });

    return { status: true, data: { user: createdVehicle}, message: "Add Vehicle Success"  };
  } catch (err: unknown) {
    return { status: false, data: {}, message: "Add Vehicle Failed", error: String(err) };
  }
}

