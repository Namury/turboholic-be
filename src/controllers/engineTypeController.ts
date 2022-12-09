import {
    getEngineTypeService,
  } from "$services/engineTypeServices";
  import {
    response_internal_server_error,
    response_success,
  } from "$utils/response.utils";
  import { Request, Response } from "express";
  
  export async function getEngineType(req: Request, res: Response) {
    try {
      const { status, data, error } = await getEngineTypeService();
      if (status) {
        return response_success(res, data);
      } else {
        return response_internal_server_error(res, error);
      }
    } catch (err: unknown) {
      return response_internal_server_error(res, String(err));
    }
  }