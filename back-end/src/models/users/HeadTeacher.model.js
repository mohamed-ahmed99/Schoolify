import mongoose from "mongoose";

// اسكيما خاصة بالـ HeadTeacher
const headTeacherSchema = new mongoose.Schema({

  // ربط باليوزر العام
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "users", 
    required: true 
  },

  // === Info ===
  Info: {
    yearsOfExperience: { type: Number, default: 0 },
    salary: { type: String }, 
    previousSubjects: { type: [String], default: [] }, 
    notes: { type: String, default: "" },
  },

  
  isActive: { type: Boolean, default: true },

}, { timestamps: true });

const HeadTeacherModel = mongoose.model("HeadTeacher", headTeacherSchema);
export default HeadTeacherModel;