import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "StudentProfile" }],
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "TeacherProfile" }],
  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" }
}, { timestamps: true });

export default mongoose.model("Class", classSchema);