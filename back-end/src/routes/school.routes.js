
import { Router } from "express";
import { getSchoolById, getSchools } from "../controllers/school.controller.js";

const schoolRoutes = Router()


schoolRoutes.get("/get", getSchools)
schoolRoutes.get("/get/:id", getSchoolById)

export default schoolRoutes