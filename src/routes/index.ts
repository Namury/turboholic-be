import { response_not_found } from "$utils/response.utils";
import { Express, Request, Response } from "express";
import engineTypeRoutes from "./engineTypeRoutes";
import fuelTypeRoutes from "./fuelTypeRoutes";
import fuelUpdateRoutes from "./fuelUpdateRoutes";
import userRoutes from "./userRoutes";
import vehicleRoutes from "./vehicleRoutes";


export default function routes(app: Express) {
  app.use("/user", userRoutes);
  app.use("/vehicle", vehicleRoutes);
  app.use("/engine", engineTypeRoutes);
  app.use("/fuel", fuelTypeRoutes);
  app.use("/fuel-update", fuelUpdateRoutes);
  app.all("*", (req: Request, res: Response) => {
    return response_not_found(res);
  });
}
