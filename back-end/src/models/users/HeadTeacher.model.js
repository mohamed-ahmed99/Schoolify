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

const HeadTeacherModel = mongoose.model("HeadTeacher", headTeacherSchema);
export default HeadTeacherModel;