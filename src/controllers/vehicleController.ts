import {
    addVehicleService,
} from "$services/vehicleServices";
import {
    response_internal_server_error,
    response_success,
    response_unauthorized,
} from "$utils/response.utils";
import { VehicleRegister } from "$utils/vehicle.utils";
import { Request, Response } from "express";
  
  export async function register(req: Request, res: Response) {
    try {
      const vehicleData:VehicleRegister = req.body
    
      const { status, data, error } = await addVehicleService(vehicleData);
      if (status) {
        return response_success(res, data);
      } else {
        return response_unauthorized(res, error);
      }
  
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }