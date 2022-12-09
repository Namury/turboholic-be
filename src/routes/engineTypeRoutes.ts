import { getEngineType } from "$controllers/engineTypeController";
import express from "express";

const engineTypeRoutes = express.Router();

engineTypeRoutes.get("/", getEngineType);

export default engineTypeRoutes;
