import {
  getFuelTypeService,
  getFuelTypeByEngineService,
} from "$services/fuelTypeServices";
import {
  response_internal_server_error,
  response_success,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function getFuelType(req: Request, res: Response) {
  try {
    const { status, data, error } = await getFuelTypeService();
    if (status) {
      return response_success(res, data);
    } else {
      return response_internal_server_error(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}

export async function getFuelTypeByEngine(req: Request, res: Response) {
  try {
    const engineTypeId = Number(req.params.engineTypeId);
    const { status, data, error } = await getFuelTypeByEngineService(
      engineTypeId
    );
    if (status) {
      return response_success(res, data);
    } else {
      return response_internal_server_error(res, error);
    }
  } catch (err: unknown) {
    return response_internal_server_error(res, String(err));
  }
}
