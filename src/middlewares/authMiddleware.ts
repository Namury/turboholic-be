import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { prisma } from "$utils/prisma.utils";
import { response_unauthorized } from "$utils/response.utils";

export function checkJwt(req: Request, res: Response, next: NextFunction) {
  const token = <string>req.headers["auth"];
  let jwtPayload;

  try {
    jwtPayload = <any>(
      jwt.verify(token, process.env.JWT_SECRET_TOKEN?.toString() || "")
    );
    res.locals.jwtPayload = jwtPayload;
  } catch (err: any) {
    return response_unauthorized(res, err.message);
  }

  next();
}

export function checkRole(roles: string) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.jwtPayload.id;

    try {
      const user = await prisma.user.findUnique({ where: { id: id } });
      if (user != null && roles == user.role) next();
      else return response_unauthorized(res);
    } catch (err: any) {
      return response_unauthorized(err.message);
    }
  };
}
