import { addFuelUpdate } from "$utils/fuelUpdate.utils";
import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";

async function calculateKmPerLiter() {
  /*
    - params: 2 fuelUpdate data
    - Max fuel - Refuel Amount? = fuel usage
    - odometer1 - odometer2 = distance
    - distance/fuel usage
    - return {float (km/liter), float distance}
    */
  return 0;
}
async function calculateFuelSavings() {
  /*
    - params: vehicleId and fueltypeId
    - get latest fuel update by vehicle and fueltype (get, limit 3, descending)
    - if data is less than 3, return km/liter.
    - calculate Km/liter first second (1) and second third(2)
    - (2) - (1) = Km/liter and distance difference
    - distance difference * km/liter difference = Liter Saved(?)
    */
  return 0;
}

async function getFuelUpdateChart() {
  /*

  */
  return 0;
}

export async function getFuelUpdateService(
  vehicleId: number,
  fuelTypeId: number,
  dateStart?: string,
  dateEnd?: string
): Promise<response> {
  try {
    /*
    - params: vehicleId and fuelTypeId
    - get fuel update data by vehicle and fueltype
    - calculate kmPerliter of each 2 data
    - if it's the first data, calculate with initial data
    - 
    */

    const dateFilter: Record<string, unknown> = {};

    if (dateStart) {
      dateFilter.gte = new Date(dateStart);
    }

    if (dateEnd) {
      dateFilter.lte = new Date(dateEnd);
    }

    console.log(dateFilter)

    const fuelUpdate = await prisma.fuelUpdate.findMany({
      where: {
        vehicleId,
        fuelTypeId,
        refuelDate: dateFilter,
      },
    });

    console.log(fuelUpdate);
    calculateKmPerLiter;
    calculateFuelSavings;
    getFuelUpdateChart;

    return {
      status: true,
      data: { fuelUpdate },
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

export async function addFuelUpdateService(
  fuelUpdateData: addFuelUpdate
): Promise<response> {
  try {
    const fuelUpdate = await prisma.fuelUpdate.create({
      data: {
        ...fuelUpdateData,
      },
    });

    return {
      status: true,
      data: { fuelUpdate },
      message: "Add Fuel Update Success",
    };
  } catch (err: unknown) {
    return {
      status: false,
      data: {},
      message: "Add Fuel Update Failed",
      error: String(err),
    };
  }
}
