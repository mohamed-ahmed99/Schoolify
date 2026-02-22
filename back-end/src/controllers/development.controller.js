
import asyncHandler from "../middleware/asyncHandler.js"
import SchoolModel from "../models/School.model.js"

import UsersModel from "../models/users/User.model.js"
import HeadTeacherModel from "../models/users/HeadTeacher.model.js"



export const createSchoolAccount = asyncHandler(async (req, res) => {

    // 1️ Create the User
    const user = await UsersModel.create(req.body.user)

    if (!user) throw new Error("User creation failed")

    // 2️ Assign user._id to headTeacher.user
    req.body.headTeacher.user = user._id

    // 3️ Create the HeadTeacher
    const headTeacher = await HeadTeacherModel.create(req.body.headTeacher)
    if (!headTeacher) throw new Error("HeadTeacher creation failed")

    // 4️ Assign headTeacher._id to school administration
    req.body.school.administration.headTeacher = headTeacher._id

    // 5️ Create the School
    const school = await SchoolModel.create(req.body.school)

    res.status(201).json({
        status: "success",
        data: { user, headTeacher, school }
    })
})

