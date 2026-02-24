
import { Router } from "express";
import { getUserProfile } from "../controllers/users.controller.js";

const usersRoutes = Router()


usersRoutes.get("/profile/:id", getUserProfile)

export default usersRoutes