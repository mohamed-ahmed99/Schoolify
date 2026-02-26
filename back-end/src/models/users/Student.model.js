

import mongoose from "mongoose";

const studentProfileSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  
  grade: { type: String, required: true },
  parentPhone: { type: String },
  attendanceRecord: [{ date: Date, status: String }],
  classes: { type: mongoose.Schema.Types.ObjectId, ref: "Class"},
}, { timestamps: true });

export default mongoose.model("StudentProfile", studentProfileSchema);