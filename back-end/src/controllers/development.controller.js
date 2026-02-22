
import asyncHandler from "../middleware/asyncHandler.js"
import SchoolModel from "../models/School.model.js"




export const createSchoolAccount = asyncHandler(async (req, res) => {
    await SchoolModel.create(req.body)
    res.status(201).json({status:"success"})
})