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


export const getSchoolById = asyncHandler(async (req, res) => {
    const {id} = req.params

    if (!id){
        res.status(400).json({status:"fail", message:"id is required", data:null})
    }

    const school = await SchoolModel.findById(id)
    if (!school){
        res.status(404).json({status:"fail", message:"school not found", data:null})
    }

    res.status(200).json({status:"success", message:"", data:{school}})
})