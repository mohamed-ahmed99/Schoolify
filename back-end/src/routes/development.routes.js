
import { Router } from "express";
import { createSchoolAccount } from "../controllers/development.controller.js";

const developmentRoutes = Router()


developmentRoutes.post("/create-school-account", createSchoolAccount)

export default developmentRoutes