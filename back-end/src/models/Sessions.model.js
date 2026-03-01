import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    ip: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    userAgent: {
        type: String,
        trim: true
    }
}, { timestamps: true });

const Sessions = mongoose.model("sessions", sessionSchema);

export default Sessions;
