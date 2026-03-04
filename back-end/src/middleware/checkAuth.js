import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import Sessions from "../models/Sessions.model.js";
import { ROLES } from "../utils/constants.js";

export const checkAuth = (allowedRoles = []) => {
    return asyncHandler(async (req, res, next) => {
        let token;

        // 1. Extract token from header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ status: "fail", message: "No token provided, authorization denied", data: null });
        }

        try {
            // 2. Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Check if session exists in DB
            const session = await Sessions.findOne({user: decoded.id });
            if (!session) {
                return res.status(401).json({ status: "fail", message: "Session expired or invalid. Please sign in again.", data: null });
            }

            // 4. Attach decoded payload to request
            req.user = decoded; // { id, role, email, ... }

            // 5. Role Authorization
            // System Admin has full access
            if (req.user.role === ROLES.SYSTEM_ADMIN) {
                return next();
            }

            // Check if role is allowed (if allowedRoles is not empty)
            if (allowedRoles.length > 0 && !allowedRoles.includes(req.user.role)) {
                return res.status(403).json({
                    status: "fail",
                    message: `User role ${req.user.role} is not authorized to access this route`,
                    data: null
                });
            }

            next();
        } catch (error) {
            console.error("Auth Middleware Error:", error);
            return res.status(401).json({ status: "fail", message: "Token is not valid", data: null });
        }
    });
};

