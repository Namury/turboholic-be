import {
    addVehicle
  } from "$controllers/vehicleController";
  import express from "express";
  import {
    validateAddVehicle
  } from "$validations/vehicleValidation";
  
  const vehicleRoutes = express.Router();
  
  vehicleRoutes.post("/add", validateAddVehicle, addVehicle);


  export default vehicleRoutes;
  