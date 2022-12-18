import {
    getFuelUpdateService,
    addFuelUpdateService,
    getFuelUpdateSummaryService
  } from "$services/fuelUpdateServices";
import { addFuelUpdate } from "$utils/fuelUpdate.utils";
  import {
    response_internal_server_error,
    response_success,
    response_unauthorized,
  } from "$utils/response.utils";
  import { Request, Response } from "express";
  
  export async function getFuelUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const vehicleId = Number(req.query.vehicleId)
      const fuelTypeId = Number(req.query.fuelTypeId)
      let dateStart
      let dateEnd
      if(req.query.dateStart) dateStart = String(req.query.dateStart)
      if(req.query.dateEnd) dateEnd = String(req.query.dateEnd)

      const { status, data, error } = await getFuelUpdateService(vehicleId, fuelTypeId, dateStart, dateEnd);
      if (status) {
        return response_success(res, data);
      } else {
        return response_unauthorized(res, error);
      }
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }

  export async function getFuelUpdateSummary(req: Request, res: Response): Promise<Response> {
    try {
      const vehicleId = Number(req.query.vehicleId)
      let dateStart
      let dateEnd
      if(req.query.dateStart) dateStart = String(req.query.dateStart)
      if(req.query.dateEnd) dateEnd = String(req.query.dateEnd)

      const { status, data, error } = await getFuelUpdateSummaryService(vehicleId, dateStart, dateEnd);
      if (status) {
        return response_success(res, data);
      } else {
        return response_unauthorized(res, error);
      }
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }
  
  export async function addFuelUpdate(req: Request, res: Response) {
    try {
      const {
        vehicleId,
        fuelTypeId,
        fuelGaugeBefore,
        fuelGaugeAfter,
        refuelAmount,
        refuelDate,
        currentOdometer,
      } = req.body

      const fuelUpdateData:addFuelUpdate = {
        userId: Number(res.locals.jwtPayload.id),
        vehicleId: Number(vehicleId),
        fuelTypeId: Number(fuelTypeId),
        fuelGaugeBefore: Number(fuelGaugeBefore),
        fuelGaugeAfter: Number(fuelGaugeAfter),
        refuelAmount: Number(refuelAmount),
        refuelDate: new Date(refuelDate),
        currentOdometer: Number(currentOdometer),
      }

      const { status, data, error } = await addFuelUpdateService(fuelUpdateData);
      if (status) {
        return response_success(res, data);
      } else {
        return response_internal_server_error(res, error);
      }
  
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }