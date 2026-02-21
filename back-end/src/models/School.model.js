import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String },
  region: { type: mongoose.Schema.Types.ObjectId, ref: "Region" },
  admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

export default mongoose.model("School", schoolSchema);