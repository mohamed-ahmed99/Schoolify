import asyncHandler from "../middleware/asyncHandler.js";
import Schools from "../models/School.model.js";


export const getNotVerifiedSchools = asyncHandler(async (req, res) => {
    // get all schools that are not verified
    const { page = 1, limit = 10 } = req.query

    // get the schools
    const schools = await Schools.find({ isActive: false, isVerified: true })
    .sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).select("-verification")

    // return the schools
    return res.status(200).json({
        status: "success",
        message: "Not verified schools found successfully",
        data: { count: schools.length, schools }
    });
})

export const verifySchool = asyncHandler(async (req, res) => {
    // get the school
    const school = await Schools.findById(req.params.id)

    // check if school exists and is not verified and not active
    if (!school) return res.status(404).json({ status: "fail", message: "School not found", data: null });
    if (school.isActive) return res.status(400).json({ status: "fail", message: "School already active", data: null });
    if (!school.isVerified) return res.status(400).json({ status: "fail", message: "School not verified", data: null });

    // verify the school
    school.isActive = true
    await school.save()

    // return the school
    return res.status(200).json({
        status: "success",
        message: "School verified successfully",
        data: {id: school.id}
    });
})