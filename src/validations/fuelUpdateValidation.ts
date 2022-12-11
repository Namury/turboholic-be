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

  if (refuelAmount > currentVehicle.maxFuelCapacity)
    return response_bad_request(res, "Refuel Amount is invalid");

  if (currentOdometer < currentVehicle.initialOdometer)
    return response_bad_request(res, "Current Odometer is invalid");

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
