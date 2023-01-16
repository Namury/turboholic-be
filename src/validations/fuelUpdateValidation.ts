import { response_bad_request } from "$utils/response.utils";
import { prisma } from "$utils/prisma.utils";
import { Request, NextFunction, Response } from "express";

export async function validateAddFuelUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    vehicleId,
    fuelTypeId,
    fuelGaugeBefore,
    fuelGaugeAfter,
    refuelAmount,
    refuelDate,
    currentOdometer,
  } = req.body;

  if (!vehicleId) return response_bad_request(res, "vehicleId is required");
  if (!fuelTypeId) return response_bad_request(res, "fuelTypeId is required");
  if (!fuelGaugeBefore)
    return response_bad_request(res, "fuelGaugeBefore is required");
  if (!fuelGaugeAfter)
    return response_bad_request(res, "fuelGaugeAfter is required");
  if (!refuelAmount)
    return response_bad_request(res, "refuelAmount is required");
  if (!refuelDate) return response_bad_request(res, "refuelDate is required");
  if (!currentOdometer)
    return response_bad_request(res, "currentOdometer is required");

  const currentVehicle = await prisma.vehicle.findUnique({
    where: {
      id: Number(vehicleId),
    },
  });

  if (!currentVehicle) {
    return response_bad_request(res, "Vehicle ID not found");
  }

  const currentFuelUpdate = await prisma.fuelUpdate.findFirst({
    where: {
      vehicleId: currentVehicle.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (new Date(refuelDate) < new Date((new Date(currentVehicle.createdAt)).valueOf() - 1000*60*60*24)) {
    return response_bad_request(res, "Refuel Date is older than initial data");
  }

  if (
    currentFuelUpdate &&
    new Date(refuelDate) < new Date((new Date(currentFuelUpdate.refuelDate)).valueOf() - 1000*60*60*24)
  ) {
    return response_bad_request(
      res,
      "Refuel Date is older than latest fuel update"
    );
  }

  if (refuelAmount > currentVehicle.maxFuelCapacity)
    return response_bad_request(
      res,
      "Refuel Amount is more than max fuel capacity"
    );

  if (currentOdometer < currentVehicle.initialOdometer)
    return response_bad_request(
      res,
      "Current Odometer is less than initial data"
    );

  if (
    currentFuelUpdate &&
    currentOdometer <= currentFuelUpdate.currentOdometer
  ) {
    return response_bad_request(
      res,
      "Current Odometer is less or equal than latest fuel update"
    );
  }

  if (fuelGaugeAfter > currentVehicle.maxFuelGauge || fuelGaugeAfter < 0)
    return response_bad_request(res, "fuelGaugeAfter is invalid");

  if (
    fuelGaugeBefore &&
    (fuelGaugeBefore > currentVehicle.maxFuelGauge || fuelGaugeBefore < 0)
  )
    return response_bad_request(res, "fuelGaugeBefore is invalid");

  if (fuelGaugeBefore > fuelGaugeAfter)
    return response_bad_request(
      res,
      "fuelGaugeAfter and fuelGaugeBefore is invalid"
    );

  next();
}
