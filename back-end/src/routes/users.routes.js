
import { Router } from "express";
import { getUserProfile } from "../controllers/users.controller.js";

const usersRoutes = Router()


usersRoutes.get("/profile/:userId", getUserProfile)

export default usersRoutes