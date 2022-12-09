import {
  getFuelType,
  getFuelTypeByEngine,
} from "$controllers/fuelTypeController";
import express from "express";

const fuelTypeRoutes = express.Router();

fuelTypeRoutes.get("/", getFuelType);
fuelTypeRoutes.get("/:engineTypeId", getFuelTypeByEngine);

export default fuelTypeRoutes;
