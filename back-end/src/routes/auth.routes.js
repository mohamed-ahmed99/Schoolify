import { Router } from "express";
import { signUp } from "../controllers/auth.controller.js";

const authRoutes = Router()


authRoutes.post("/signup", signUp)



export default authRoutes