import mongoose from "mongoose";
import { ROLES } from "../../utils/constants.js";

const userSchema = new mongoose.Schema({

  // Personal Info
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    avatar: { type: String },
    age: { type: Number },
    bio: { type: String },
    birthDay: { type: String },
  },

  // Contact Info
  contact: {
    phoneNumber: { type: String },
    email: { type: String, required: true, unique: true, index: true },
    address: {
      country: { type: String },
      governorate: { type: String },
      city: { type: String },
      street: { type: String },
    },
  },

  // Account Info
  account: {
    password: { type: String, required: true, select: false },
    role: { type: String, enum: Object.values(ROLES), required: true },
  },

  verification: {
    code: { type: String },
    expiresAt: { type: Date, default: Date.now() + 10 * 60 * 1000 }
  },

  // school info
  school: { type: mongoose.Schema.Types.ObjectId, ref: "schools" },

  // status
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },

}, { timestamps: true });

userSchema.index({ "verification.expiresAt": 1 }, {
  expireAfterSeconds: 600,
  partialFilterExpression: { isVerified: false }
});

const Users = mongoose.model("users", userSchema);
export default Users;