
import { Router } from "express";
import { getUserProfile, createUser } from "../controllers/users.controller.js";

const usersRoutes = Router()


usersRoutes.get("/profile/:id", getUserProfile)
usersRoutes.post("/create", createUser)

export default usersRoutes