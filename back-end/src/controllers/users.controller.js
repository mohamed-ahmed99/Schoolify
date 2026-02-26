// packages
import bcrypt from "bcrypt";

// utils
import { ROLES } from "../utils/constants.js";

// middleware
import asyncHandler from "../middleware/asyncHandler.js";

// models 
import UsersModel from "../models/users/User.model.js";
import StudentProfile from "../models/users/Student.model.js";
import TeacherProfile from "../models/users/Teacher.model.js";
import HeadTeacherProfile from "../models/users/HeadTeacher.model.js";
import SchoolAdminProfile from "../models/users/SchoolAdmin.model.js";



// GET /api/users/profile/:id 
export const getUserProfile = asyncHandler(async (req, res) => {
    const { id } = req.params;


    const user = await UsersModel.findById(id)
        .populate("school", "identity.name identity.logo");

    if (!user) {
        return res.status(404).json({
            status: "error",
            message: `User with id ${id} not found`,
            data: null,
        });
    }

    let profileData = null;
    const userRole = user.account.role;


    switch (userRole) {
        case ROLES.STUDENT:
            profileData = await StudentProfile.findOne({ user: id })
                .populate("classes");
            break;

        case ROLES.TEACHER:
            profileData = await TeacherProfile.findOne({ user: id })
                .populate("classes");
            break;

        case ROLES.HEAD_TEACHER:
            profileData = await HeadTeacherProfile.findOne({ user: id });
            break;

        case ROLES.SCHOOL_ADMIN:
            profileData = await SchoolAdminProfile.findOne({ user: id })
                .populate("managedSchools");
            break;

        default:
            profileData = null;
    }

    res.status(200).json({
        status: "success",
        data: {
            user,
            profile: profileData,
            role: userRole,
        },
    });
});



// POST /api/users
export const createUser = asyncHandler(async (req, res) => {
    const { user, profile } = req.body;

    if (!user || !profile) {
        return res.status(400).json({ status: "fail", message: "user and profile data are required", data: null });
    }

    // hash password
    user.account.password = await bcrypt.hash(user.account.password, 10);

    // create user
    const newUser = await UsersModel.create(user);

    // create role profile based on user role
    let profileData = null;

    switch (newUser.account.role) {
        case ROLES.STUDENT:
            profileData = await StudentProfile.create({ ...profile, user: newUser._id });
            break;

        case ROLES.TEACHER:
            profileData = await TeacherProfile.create({ ...profile, user: newUser._id });
            break;

        case ROLES.HEAD_TEACHER:
            profileData = await HeadTeacherProfile.create({ ...profile, user: newUser._id });
            break;

        case ROLES.SCHOOL_ADMIN:
            profileData = await SchoolAdminProfile.create({ ...profile, user: newUser._id });
            break;
        default:
            // For roles like system_admin or others without specific profiles
            profileData = null;
    }

    res.status(201).json({
        status: "success",
        message: "User and profile created successfully",
        data: { user: newUser, profile: profileData }
    });
});
