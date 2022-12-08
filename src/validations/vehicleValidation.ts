import { response_bad_request } from "$utils/response.utils";
import { Request, NextFunction, Response } from "express";

export function validateAddVehicle(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    licensePlate,
    brand,
    engineTypeId,
    initialFuelTypeId,
    maxFuelCapacity,
    maxFuelGauge,
    initialFuelGauge,
    initialOdometer } = req.body;

  if (!licensePlate) return response_bad_request(res, "licensePlate is required")     
  if (!brand) return response_bad_request(res, "brand is required")            
  if (!engineTypeId) return response_bad_request(res, "engineTypeId is required")     
  if (!initialFuelTypeId) return response_bad_request(res, "initialFuelTypeId is required")
  if (!maxFuelCapacity) return response_bad_request(res, "maxFuelCapacity is required")  
  if (!maxFuelGauge) return response_bad_request(res, "maxFuelGauge is required")     
  if (!initialFuelGauge) return response_bad_request(res, "initialFuelGauge is required") 
  if (!initialOdometer) return response_bad_request(res, "initialOdometer is required")  
  next();
}