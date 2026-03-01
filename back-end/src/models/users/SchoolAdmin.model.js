import mongoose from "mongoose";

const schoolAdminProfileSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  managedSchools: [{ type: mongoose.Schema.Types.ObjectId, ref: "schools" }],
  permissions: [{ type: String }] // مثال: ["manage_students", "manage_teachers"]
}, { timestamps: true });

const SchoolAdmins = mongoose.model("schoolAdmins", schoolAdminProfileSchema);
export default SchoolAdmins