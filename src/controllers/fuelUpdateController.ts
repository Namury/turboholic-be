import {
    getFuelUpdateService,
    addFuelUpdateService
  } from "$services/fuelUpdateServuces";
  import {
    response_internal_server_error,
    response_success,
    response_unauthorized,
  } from "$utils/response.utils";
  import { Request, Response } from "express";
  
  export async function getFuelUpdate(req: Request, res: Response): Promise<Response> {
    try {
      const { status, data, error } = await getFuelUpdateService();
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
      const { status, data, error } = await addFuelUpdateService();
      if (status) {
        return response_success(res, data);
      } else {
        return response_unauthorized(res, error);
      }
  
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }