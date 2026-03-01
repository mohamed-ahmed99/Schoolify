import asyncHandler from "../middleware/asyncHandler.js";
import Schools from "../models/School.model.js";
import bcrypt from "bcrypt"

export const getSchools = asyncHandler(async (req, res) => {
    const { limit, page } = req.query

    if (!limit || !page) {
        res.status(400).json({ status: "fail", message: "limit and page are required", data: null })
    }

    const schools = await Schools.find().limit(limit).skip((page - 1) * limit).sort({ createdAt: -1 })


    res.status(200).json({ status: "success", message: "", data: { schools } })
})


export const getSchoolById = asyncHandler(async (req, res) => {
    const { id } = req.params

    if (!id) {
        res.status(400).json({ status: "fail", message: "id is required", data: null })
    }

    const school = await Schools.findById(id)
    if (!school) {
        res.status(404).json({ status: "fail", message: "school not found", data: null })
    }

    res.status(200).json({ status: "success", message: "", data: { school } })
})



// create school
export const createSchool = asyncHandler(async (req, res) => {
    const school = req.body;

    if (!school) {
        return res.status(400).json({ status: "fail", message: "school data is required", data: null });
    }

    // check if school exists
    const isSchoolExists = await Schools.findOne({ "contact.email": school.contact.email });
    if (isSchoolExists) {
        return res.status(400).json({ status: "fail", message: "This email is already used in another school, try another email or login", data: null });
    }

    // hash password
    if (school.account?.password) {
        school.account.password = await bcrypt.hash(school.account.password, 10)
    }

    // generate verification code
    const schoolCode = Math.floor(100000 + Math.random() * 900000);

    const schoolData = {
        ...school,
        verification: { code: schoolCode },
    };

    // Create School
    const newSchool = await Schools.create(schoolData);

    res.status(201).json({ status: "success", message: "School created successfully", data: { schoolId: newSchool._id } });
})