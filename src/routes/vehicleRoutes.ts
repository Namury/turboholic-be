import {
    getVehicle,
    addVehicle
} from "$controllers/vehicleController";
import express from "express";
import {
  validateAddVehicle
} from "$validations/vehicleValidation";
import { checkJwt } from "$middlewares/authMiddleware";
  
  const vehicleRoutes = express.Router();
  
  vehicleRoutes.get("/", checkJwt, getVehicle);
  vehicleRoutes.post("/add", checkJwt, validateAddVehicle, addVehicle);

  export default vehicleRoutes;
  