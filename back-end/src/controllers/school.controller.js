import asyncHandler from "../middleware/asyncHandler.js";
import SchoolModel from "../models/School.model.js";





export const getSchools = asyncHandler(async (req, res) => {
    const {limit, page} = req.query

    if (!limit || !page){
        res.status(400).json({status:"fail", message:"limit and page are required", data:null})
    }

    const schools = await SchoolModel.find().limit(limit).skip((page-1) * limit).sort({createdAt:-1})


    res.status(200).json({status:"success", message:"", data:{schools}})
})