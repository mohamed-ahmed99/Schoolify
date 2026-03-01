import mongoose from "mongoose";
import { ROLES } from "../utils/constants.js";

const schoolSchema = new mongoose.Schema({

  // Identity
  identity: {
    name: { type: String, required: true },
    description: { type: String },
    code: { type: String, required: true, unique: true },
    logo: String,
  },

  account: {
    password: { type: String, required: true, select: false },
    role: { type: String, default: ROLES.SCHOOL },
  },

  // Contact
  contact: {
    email: { type: String, required: true },
    phone: String,
    website: String,

    socialLinks: [
      {
        platform: String,
        url: String,
      }
    ],

    address: {
      country: String,
      governorate: String,
      city: String,
      street: String,
    },
  },

  // Administration
  administration: {
    headTeacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: false
    },

    educationalStage: {
      type: String,
      enum: ["primary", "preparatory", "secondary", "all"]
    },

    isActive: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },

  },

  verification: {
    code: { type: String },
    expiresAt: { type: Date, default: Date.now() + 10 * 60 * 1000 }
  },
  // Statistics
  stats: {
    totalStudents: { type: Number, default: 0 },
    totalTeachers: { type: Number, default: 0 },
    totalAdmins: { type: Number, default: 0 },
    totalClasses: { type: Number, default: 0 }
  },

}, { timestamps: true });

schoolSchema.index({ "administration.verification.expiresAt": 1 }, {
  expireAfterSeconds: 600,
  partialFilterExpression: { "administration.verification.isVerified": false }
});

const Schools = mongoose.model("schools", schoolSchema)
export default Schools
