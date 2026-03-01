import { Router } from "express";
import { verifyEmail } from "../controllers/auth.controller.js";

const authRoutes = Router()


authRoutes.post("/verify-email", verifyEmail)



export default authRoutes