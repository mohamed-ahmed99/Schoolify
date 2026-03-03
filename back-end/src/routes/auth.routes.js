import { Router } from "express";
import { verifyEmail, signIn } from "../controllers/auth.controller.js";

const authRoutes = Router()


authRoutes.post("/verify-email", verifyEmail)
authRoutes.post("/sign-in", signIn)



export default authRoutes