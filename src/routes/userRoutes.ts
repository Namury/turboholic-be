import {
    login,
    registerSekolah
  } from "$controllers/userController";
  import express from "express";
  import {
    validateLoginRequest,
    validateRegisterSekolahRequest
  } from "$validations/userValidation";
  
  const userRoutes = express.Router();
  
  userRoutes.post("/login", validateLoginRequest, login);
  userRoutes.post(
    "/register/sekolah",
    validateRegisterSekolahRequest,
    registerSekolah
  );

  export default userRoutes;
  