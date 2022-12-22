import {
  addFuelUpdate,
  chartData,
  kmPerLiterCalculation,
  summaryData,
  round,
} from "$utils/fuelUpdate.utils";
import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { FuelUpdate } from "@prisma/client";

function calculateKmPerLiter(
  data1: kmPerLiterCalculation,
  data2: kmPerLiterCalculation
) {
  /*
    - params: 2 fuelUpdate data
    - Max fuel - Refuel Amount? = fuel usage
    - odometer1 - odometer2 = distance
    - distance/fuel usage
    - return {float (km/liter), float distance}
    */
  const distance = data2.currentOdometer - data1.currentOdometer;
  const fuelUsage = distance / data2.refuelAmount;

  return {
    fuelUsage, //km per liter
    distance, //km
  };
}
function calculateFuelSavings(fuelUpdate: FuelUpdate[], fuelPrice: number) {
  /*
    - get latest fuel update by vehicle and fueltype (get, limit 3, descending)
    - if data is less than 3, return km/liter.
    - calculate Km/liter first second (1) and second third(2)
    - (2) - (1) = Km/liter and distance difference
    - distance difference * km/liter difference = Liter Saved(?)
  */

  if (fuelUpdate.length < 3) {
    return null;
  }

  const data1 = {
    refuelAmount: fuelUpdate[fuelUpdate.length - 1].refuelAmount,
    currentOdometer: fuelUpdate[fuelUpdate.length - 1].currentOdometer,
  }; //newest

  const data2 = {
    refuelAmount: fuelUpdate[fuelUpdate.length - 2].refuelAmount,
    currentOdometer: fuelUpdate[fuelUpdate.length - 2].currentOdometer,
  };

  const data3 = {
    refuelAmount: fuelUpdate[fuelUpdate.length - 3].refuelAmount,
    currentOdometer: fuelUpdate[fuelUpdate.length - 3].currentOdometer,
  }; //oldest

  const fuelUsage1 = calculateKmPerLiter(data2, data1);
  const fuelUsage2 = calculateKmPerLiter(data3, data2);

  // console.log("Fuel Usagee 1", fuelUpdate[fuelUpdate.length - 1])
  // console.log("Fuel Usagee 2", fuelUpdate[fuelUpdate.length - 2])
  // console.log("Fuel Usagee 3", fuelUpdate[fuelUpdate.length - 3])
  // console.log("Fuel Usage 1", fuelUsage1)
  // console.log("Fuel Usage 2", fuelUsage2)

  const distanceDifference = fuelUsage2.distance;
  const fuelUsageDifference = fuelUsage1.fuelUsage - fuelUsage2.fuelUsage;

  const fuelSavings = distanceDifference / fuelUsageDifference;

  return {
    fuelSavingsLiter: round(fuelSavings, 1),
    fuelSavingRupiah: round(fuelSavings * fuelPrice),
  };
}

function getFuelUpdateChart(fuelUpdate: FuelUpdate[]) {
  const chartData: chartData[] = [];
  let currentFuelUsage;
  let totalDistance = 0;
  let data1: FuelUpdate;
  let data2: FuelUpdate;

  fuelUpdate.forEach(function (data, index) {
    if (index == 0) {
      data1 = data;
    }

    if (index < fuelUpdate.length && index != 0) {
      data2 = data;
      const total = calculateKmPerLiter(data1, data2);
      totalDistance += total.distance;
      if (index == fuelUpdate.length - 1) {
        currentFuelUsage = total.fuelUsage;
      }
      chartData.push({
        date: String(
          data.refuelDate.toLocaleString("id-ID", {
            day: "numeric",
            month: "short",
          })
        ),
        total: round(total.fuelUsage, 1),
      });
      data1 = data;
    }
  });

  return {
    currentFuelUsage,
    totalDistance,
    chartData,
  };
}

export async function getFuelUpdateService(
  vehicleId: number,
  fuelTypeId?: number,
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
  return chart, saving
    */

    const dateFilter: Record<string, unknown> = {};

    if (dateStart) {
      dateFilter.gte = new Date(dateStart);
    }

    if (dateEnd) {
      dateFilter.lte = new Date(dateEnd);
    }

    const fuelUpdate = await prisma.fuelUpdate.findMany({
      where: {
        vehicleId,
        fuelTypeId: fuelTypeId?fuelTypeId:undefined,
        refuelDate: dateFilter,
      },
      orderBy: {
        refuelDate: "asc",
      },
    });

    let fuelType

    if(fuelTypeId){
      fuelType = await prisma.fuelType.findUnique({
        where: {
          id: fuelTypeId,
        },
      });
    }

    // if (!fuelType) {
    //   return {
    //     status: false,
    //     data: { fuelUpdate },
    //     message: "fuelType is Invalid",
    //     error: "",
    //   };
    // }

    const fuelUpdateChart = getFuelUpdateChart(fuelUpdate);

    return {
      status: true,
      data: {
        chartData: fuelUpdateChart.chartData,
        fuelPrice: fuelType?.price || null,
        currentFuelUsage: fuelUpdateChart.currentFuelUsage,
        totalDistance: fuelUpdateChart.totalDistance,
        fuelSavingsData: fuelType?.price ? calculateFuelSavings(fuelUpdate, fuelType.price) : null,
      },
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

export async function getFuelUpdateSummaryService(
  vehicleId: number,
  dateStart?: string,
  dateEnd?: string
): Promise<response> {
  try {
    /*
    - get fuel type by engine id
    - foreach fuel type = get fuel saving
    */

    const dateFilter: Record<string, unknown> = {};

    if (dateStart) {
      dateFilter.gte = new Date(dateStart);
    }

    if (dateEnd) {
      dateFilter.lte = new Date(dateEnd);
    }

    const currentVehicle = await prisma.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });

    if (!currentVehicle) {
      return {
        status: false,
        data: { vehicleId },
        message: "vehicleID is Invalid",
        error: "",
      };
    }

    const fuelTypes = await prisma.fuelType.findMany({
      where: {
        engineTypeId: currentVehicle.engineTypeId,
      },
    });

    if (!fuelTypes) {
      return {
        status: false,
        data: { currentVehicle },
        message: "fuelType is Invalid",
        error: "",
      };
    }

    const returnData: summaryData[] = [];

    for (const fuelType of fuelTypes) {
      const fuelUpdate = await prisma.fuelUpdate.findMany({
        where: {
          vehicleId,
          fuelTypeId: fuelType.id,
          refuelDate: dateFilter,
        },
        orderBy: {
          refuelDate: "asc",
        },
        take: 3,
      });
      const fuelSavings = calculateFuelSavings(fuelUpdate, fuelType.price);

      returnData.push({
        fuelType: fuelType.name,
        fuelPrice: fuelType.price,
        fuelSavingRupiah: fuelSavings?.fuelSavingRupiah || null,
        fuelSavingsLiter: fuelSavings?.fuelSavingsLiter || null,
      });
    }

    return {
      status: true,
      data: returnData,
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

// export async function getUserRankingService(vehicles:Vehicle[]){
//   for (const vehicle of vehicles) {
//     await getFuelUpdateSummaryService(vehicle.id)
//   }
// }

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
