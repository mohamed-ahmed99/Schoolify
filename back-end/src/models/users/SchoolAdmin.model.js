import mongoose from "mongoose";

const schoolAdminProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  managedSchools: [{ type: mongoose.Schema.Types.ObjectId, ref: "School" }],
  permissions: [{ type: String }] // مثال: ["manage_students", "manage_teachers"]
}, { timestamps: true });

export default mongoose.model("SchoolAdminProfile", schoolAdminProfileSchema);