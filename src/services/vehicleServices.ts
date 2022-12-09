import { prisma } from "$utils/prisma.utils";
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

export async function getVehicleService(userId:number): Promise<response> {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where:{
        userId
      }
    })

    return { status: true, data: { vehicles }, message: "Get Vehicle Success"  };
  } catch (err: unknown) {
    return { status: false, data: {}, message: "Get Vehicle Failed", error: String(err) };
  }
}

