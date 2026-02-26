import asyncHandler from "../middleware/asyncHandler.js";
import SchoolModel from "../models/School.model.js";
import UsersModel from "../models/users/User.model.js";
import HeadTeacherModel from "../models/users/HeadTeacher.model.js";
import bcrypt from "bcrypt"
import { ROLES } from '../utils/constants.js'

export const getSchools = asyncHandler(async (req, res) => {
    const { limit, page } = req.query

    if (!limit || !page) {
        res.status(400).json({ status: "fail", message: "limit and page are required", data: null })
    }

    const schools = await SchoolModel.find().limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 })


    res.status(200).json({ status: "success", message: "", data: { schools } })
})


export const getSchoolById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({ status: "fail", message: "id is required", data: null })
    }

    const school = await SchoolModel.findById(id)
    if (!school) {
        res.status(404).json({ status: "fail", message: "school not found", data: null })
    }

    res.status(200).json({ status: "success", message: "", data: { school } })
})



// create school
export const createSchool = asyncHandler(async (req, res) => {
    const { user, school } = req.body;

    if (!user || !school) {
        return res.status(400).json({
            status: "fail",
            message: "headTeacher and school data are required",
            data: null
        });
    }

    // hash password
    user.user.account.password = await bcrypt.hash(user.user.account.password, 10)

    // handle data of user
    user.user.account.role = ROLES.HEAD_TEACHER

    // 1. Create User (Head Teacher)
    const newUser = await UsersModel.create(user.user);

    // 2. Create School and link it to the User (Head Teacher)
    // We update the administration object to include the headTeacher id
    const schoolData = {
        ...school,
        administration: {
            ...school.administration,
            headTeacher: newUser._id
        }
    };
    const newSchool = await SchoolModel.create(schoolData);

    // 3. Update User with the school ID
    newUser.school = newSchool._id;
    await newUser.save();

    // 4. Create HeadTeacher profile and link it to User
    const headTeacher = {
        ...user.headTeacher,
        user: newUser._id
    }
    await HeadTeacherModel.create(headTeacher);

    res.status(201).json({
        status: "success",
        message: "School and Head Teacher profile created successfully",
        data: {}
    });
})