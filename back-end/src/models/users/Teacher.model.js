
import mongoose from "mongoose";

const teacherProfileSchema = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },

  subjects: [{ type: String, required: true }],
  salary: { type: Number },

  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }]
  
}, { timestamps: true });

const Teachers = mongoose.model("teachers", teacherProfileSchema);
export default Teachers


