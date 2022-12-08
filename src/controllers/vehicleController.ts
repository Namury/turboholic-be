import {
    getVehicleService,
    addVehicleService,
} from "$services/vehicleServices";
import {
    response_internal_server_error,
    response_success,
    response_unauthorized,
} from "$utils/response.utils";
import { VehicleRegister } from "$utils/vehicle.utils";
import { Request, Response } from "express";
  
  export async function getVehicle(req: Request, res: Response) {
    try {
      console.log(res.locals.jwtPayload)
      const userId = res.locals.jwtPayload.id
    
      const { status, data, error } = await getVehicleService(userId);
      if (status) {
        return response_success(res, data);
      } else {
        return response_unauthorized(res, error);
      }
  
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }

  export async function addVehicle(req: Request, res: Response) {
    try {
      console.log(res.locals.jwtPayload)
      const {
        licensePlate,
        brand,
        engineTypeId,
        initialFuelTypeId,
        maxFuelCapacity,
        maxFuelGauge,
        initialFuelGauge,
        initialOdometer,
      } = req.body

      const vehicleData:VehicleRegister = {
        userId: Number(res.locals.jwtPayload.id),
        licensePlate,
        brand,
        engineTypeId: Number(engineTypeId),
        initialFuelTypeId: Number(initialFuelTypeId),
        maxFuelCapacity: Number(maxFuelCapacity),
        maxFuelGauge: Number(maxFuelGauge),
        initialFuelGauge: Number(initialFuelGauge),
        initialOdometer: Number(initialOdometer),
      }
      console.log(vehicleData)
    
      const { status, data, error } = await addVehicleService(vehicleData);
      if (status) {
        return response_success(res, data);
      } else {
        return response_internal_server_error(res, error);
      }
  
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }