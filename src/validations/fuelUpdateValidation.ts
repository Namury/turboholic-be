import { response_bad_request } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";

export function validateAddFuelUpdate(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    userId,
    vehicleId,
    fuelTypeId,
    fuelGaugeBefore,
    fuelGaugeAfter,
    refuelAmount,
    refuelDate,
    currentOdometer} = req.body;

  if (!userId) return response_bad_request(res, "userId is required")     
  if (!vehicleId) return response_bad_request(res, "vehicleId is required")            
  if (!fuelTypeId) return response_bad_request(res, "fuelTypeId is required")     
  if (!fuelGaugeBefore) return response_bad_request(res, "fuelGaugeBefore is required")
  if (!fuelGaugeAfter) return response_bad_request(res, "fuelGaugeAfter is required")  
  if (!refuelAmount) return response_bad_request(res, "refuelAmount is required")     
  if (!refuelDate) return response_bad_request(res, "refuelDate is required") 
  if (!currentOdometer) return response_bad_request(res, "currentOdometer is required")  
  next();
}