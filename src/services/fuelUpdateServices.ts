import { addFuelUpdate, chartData, kmPerLiterCalculation } from "$utils/fuelUpdate.utils";
import { prisma } from "$utils/prisma.utils";
import { response } from "$utils/response.utils";
import { FuelUpdate } from "@prisma/client";

 function calculateKmPerLiter(data1:kmPerLiterCalculation, data2:kmPerLiterCalculation) {
  /*
    - params: 2 fuelUpdate data
    - Max fuel - Refuel Amount? = fuel usage
    - odometer1 - odometer2 = distance
    - distance/fuel usage
    - return {float (km/liter), float distance}
    */
  const distance = data2.currentOdometer - data1.currentOdometer;
  const fuelUsage = distance / data2.refuelAmount


  return{
    fuelUsage, //km per liter
    distance //km
  };
}
async function calculateFuelSavings() {
  /*vehicleId:number, fuelTypeId: number
    - params: vehicleId and fueltypeId
    - get latest fuel update by vehicle and fueltype (get, limit 3, descending)
    - if data is less than 3, return km/liter.
    - calculate Km/liter first second (1) and second third(2)
    - (2) - (1) = Km/liter and distance difference
    - distance difference * km/liter difference = Liter Saved(?)
    */

    // const fuelUpdate = await prisma.fuelUpdate.findMany({
    //   where: {
    //     vehicleId,
    //     fuelTypeId,
    //   }, orderBy:{
    //     refuelDate: 'asc'
    //   }, take: 3
    // });

    // fuelUpdate.forEach(function(data, index){

    // })

  return 0;
}

async function getFuelUpdateChart(fuelUpdate: FuelUpdate[]) {
  const chartData:chartData[] = []
  let data1:FuelUpdate
  let data2:FuelUpdate

  fuelUpdate.forEach(function(data, index){
    if(index == 0){
      data1 = data
    }

    if(index < fuelUpdate.length && index != 0){
      data2 = data
      const total = calculateKmPerLiter(data1,data2)
      chartData.push({
        date: String(data.refuelDate),
        total: total.fuelUsage
      })
      
      data1 = data
    }

  })

  return chartData;
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
        fuelTypeId,
        refuelDate: dateFilter,
      }, orderBy:{
        refuelDate: 'asc'
      }
    });

    await getFuelUpdateChart(fuelUpdate);

    calculateKmPerLiter;
    calculateFuelSavings();

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
