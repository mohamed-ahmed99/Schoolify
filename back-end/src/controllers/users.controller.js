
import UsersModel from "../models/users/User.model.js";
import StudentProfile from "../models/users/Student.model.js";
import TeacherProfile from "../models/users/Teacher.model.js";
import HeadTeacherProfile from "../models/users/HeadTeacher.model.js";
import SchoolAdminProfile from "../models/users/SchoolAdmin.model.js";
import asyncHandler from "../middleware/asyncHandler.js";
import { ROLES } from "../utils/constants.js";


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

