import {
    getFuelUpdate,
    addFuelUpdate
} from "$controllers/fuelUpdateController";
import express from "express";
import {
  validateAddFuelUpdate
} from "$validations/fuelUpdateValidation";
import { checkJwt } from "$middlewares/authMiddleware";
  
  const fuelUpdateRoutes = express.Router();
  
  fuelUpdateRoutes.get("/", checkJwt, getFuelUpdate);
  fuelUpdateRoutes.post("/add", checkJwt, validateAddFuelUpdate, addFuelUpdate);

  export default fuelUpdateRoutes;
  