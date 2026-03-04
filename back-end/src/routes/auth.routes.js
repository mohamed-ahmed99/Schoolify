import { Router } from "express";
import { verifyEmail, signIn, verifyMe } from "../controllers/auth.controller.js";
import { checkAuth } from "../middleware/checkAuth.js";

const authRoutes = Router()


authRoutes.post("/verify-email", verifyEmail)
authRoutes.post("/sign-in", signIn)


authRoutes.get("/verify-me", checkAuth(), verifyMe)



export default authRoutes