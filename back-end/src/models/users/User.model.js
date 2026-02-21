import mongoose from "mongoose";
import { ROLES } from "../../utils/constants";

const userSchema = new mongoose.Schema({

  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true, index:true },
  password: { type: String, required: true },

  role: { 
    type: String, 
    enum: [Object.values(ROLES)], 
    required: true 
  },

  school: { type: mongoose.Schema.Types.ObjectId, ref: "School" }, // optional
  region: { type: mongoose.Schema.Types.ObjectId, ref: "Region" }  // optional
}, { timestamps: true });

export default mongoose.model("User", userSchema);