import mongoose from "mongoose";
import { ROLES } from "../../utils/constants.js";

const userSchema = new mongoose.Schema({

  // === Personal Info ===
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },      
    age: { type: Number },
    bio: { type: String },
    birthDay: { type: String },
  },

  // === Contact Info ===
  contact: {
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true, index:true },
    address: {
      country: { type: String },
      governorate: { type: String },
      city: { type: String },
      street: { type: String },
    },
  },

  // === Account Info ===
  account: {
    password: { type: String, required: true, select:false },
    role: { type: String, enum: Object.values(ROLES), required: true },
    isActive: { type: Boolean, default: true },
  },

  // === School Info ===
  school: { type: mongoose.Schema.Types.ObjectId, ref: "schools" }, 

}, { timestamps: true });

const UsersModel = mongoose.model("users", userSchema);
export default UsersModel;