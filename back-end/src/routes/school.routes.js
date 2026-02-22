
import { Router } from "express";
import { getSchools } from "../controllers/school.controller.js";

const schoolRoutes = Router()


schoolRoutes.get("/get", getSchools)

export default schoolRoutes