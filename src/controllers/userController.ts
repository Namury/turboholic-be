import {
  userLoginService,
  userRegisterSekolahService,
} from "$services/userServices";
import {
  response_internal_server_error,
  response_success,
  response_unauthorized,
} from "$utils/response.utils";
import { Request, Response } from "express";

export async function login(req: Request, res: Response): Promise<Response> {
  try {
    const { email, password, error } = req.body;
    const { status, userDetails } = await userLoginService(email, password);
    if (status) {
      return response_success(res, userDetails);
    } else {
      return response_unauthorized(res, error);
    }
  } catch (err: any) {
    return response_internal_server_error(res, err.message);
  }
}

export async function registerSekolah(req: Request, res: Response) {
  try {
    const { user, status, token, error, school } =
      await userRegisterSekolahService(req.body);
    if (status) {
      return response_success(res, { user, token, school });
    } else {
      throw new Error(error);
    }
  } catch (err: any) {
    return response_internal_server_error(res, err.message);
  }
}