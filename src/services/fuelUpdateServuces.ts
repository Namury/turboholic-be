import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

async function calculateKmPerLiter(){
    /*
    - params: 2 fuelUpdate data
    - Max fuel - Refuel Amount? = fuel usage
    - odometer1 - odometer2 = distance
    - distance/fuel usage
    - return {float (km/liter), float distance}
    */
    return 0
}
async function calculateFuelSavings() {
    /*
    - params: vehicleId and fueltypeId
    - get latest fuel update by vehicle and fueltype (get, limit 3, descending)
    - calculate Km/liter first second (1) and second third(2)
    - (2) - (1) = Km/liter and distance difference
    - distance difference * km/liter difference = Liter Saved(?)
    - 
    */
    return 0;
  }

export async function getFuelUpdateService(): Promise<response> {
  try {
    const fuelType = await prisma.fuelType.findMany();
    calculateKmPerLiter
    calculateFuelSavings

    return {
      status: true,
      data: { fuelType },
      message: "Get Fuel Update Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Fuel Update Failed",
      error: String(err),
    };
  }
}

export async function addFuelUpdateService(): Promise<response> {
  try {
    const fuelType = await prisma.fuelType.findMany();

    return {
      status: true,
      data: { fuelType },
      message: "Get Fuel Update Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Get Fuel Update Failed",
      error: String(err),
    };
  }
}
