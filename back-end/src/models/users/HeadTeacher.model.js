import mongoose from "mongoose";

// schema for head teacher
const headTeacherSchema = new mongoose.Schema({

  // link to user
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true 
  },

  // info
  info: {
    yearsOfExperience: { type: Number, default: 0 },
    salary: { type: String }, 
    previousSubjects: { type: [String], default: [] }, 
    notes: { type: String, default: "" },
  },


}, { timestamps: true });

const HeadTeachers = mongoose.model("HeadTeachers", headTeacherSchema);
export default HeadTeachers