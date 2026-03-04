import { Router } from "express";
import { checkAuth } from "../middleware/checkAuth.js";
import { ROLES } from "../utils/constants.js";
import { getNotVerifiedSchools, verifySchool } from "../controllers/admin.controller.js";


const adminRoutes = Router()

adminRoutes.get("/not-verified-schools", checkAuth([ROLES.SYSTEM_ADMIN]), getNotVerifiedSchools)
adminRoutes.patch("/verify-school/:id", checkAuth([ROLES.SYSTEM_ADMIN]), verifySchool)




export default adminRoutes