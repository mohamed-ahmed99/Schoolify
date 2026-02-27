import mongoose from "mongoose";

const schoolSchema = new mongoose.Schema({

  // Identity
  identity: {
    name: { type: String, required: true },
    description: { type: String},
    code: { type: String, required: true, unique: true },
    logo: String,
  },

  // Contact
  contact: {
    email: {type:String, required:true},
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
      required:true
    },

    educationalStage: {
      type: String,
      enum: ["primary", "preparatory", "secondary", "all"]
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },

  // Statistics
  stats: {
    totalStudents: { type: Number, default: 0 },
    totalTeachers: { type: Number, default: 0 },
    totalAdmins: { type: Number, default: 0 },
    totalClasses: { type: Number, default: 0 }
  },

}, { timestamps: true });

const Schools = mongoose.model("schools", schoolSchema)
export default Schools
