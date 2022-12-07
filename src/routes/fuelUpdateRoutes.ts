import {
    addUpdate
  } from "$controllers/fuelUpdateController";
  import express from "express";
  import {
    validateAddFuelUpdate
  } from "$validations/fuelUpdateValidation";
  
  const vehicleRoutes = express.Router();
  
  vehicleRoutes.post("/add", validateAddFuelUpdate, addUpdate);


  export default vehicleRoutes;
  