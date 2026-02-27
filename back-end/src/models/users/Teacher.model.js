
import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  subjects: [{ type: String, required: true }],
  salary: { type: Number },

  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }]
  
}, { timestamps: true });

const Teachers = mongoose.model("Teachers", teacherProfileSchema);
export default Teachers


