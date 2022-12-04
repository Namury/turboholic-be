import { response_not_found } from "$utils/response.utils";
import { Express, Request, Response } from "express";
import userRoutes from "./userRoutes";


export default function routes(app: Express) {
  app.use("/user", userRoutes);
  app.all("*", (req: Request, res: Response) => {
    return response_not_found(res);
  });
}
