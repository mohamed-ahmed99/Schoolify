
import { Router } from "express";
import { createSchool, getSchoolById, getSchools } from "../controllers/school.controller.js";

const schoolRoutes = Router()


schoolRoutes.get("/get", getSchools)
schoolRoutes.get("/get/:id", getSchoolById)

schoolRoutes.post("/create", createSchool)


export default schoolRoutes