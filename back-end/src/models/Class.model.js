import mongoose from "mongoose";

const classSchema = new mongoose.Schema({
  name: { type: String, required: true },
  grade: { type: String },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "students" }],
  teacher: [{ type: mongoose.Schema.Types.ObjectId, ref: "teachers" }],
  school: { type: mongoose.Schema.Types.ObjectId, ref: "schools" }
}, { timestamps: true });

const Classes = mongoose.model("classes", classSchema);
export default Classes