import asyncHandler from '../middleware/asyncHandler.js'
import Users from '../models/users/User.model.js'
import Schools from '../models/School.model.js'
import Sessions from '../models/Sessions.model.js'
import generateToken from '../utils/generateToken.js'





export const verifyEmail = asyncHandler(async (req, res) => {
    const { email, code, accountType } = req.body;

    if (!email || !code || !accountType) {
        return res.status(400).json({ status: "fail", message: "Email, code and accountType are required", data: null });
    }

    const ip = req.ip;
    const userAgent = req.headers['user-agent'];


    if (accountType === "user") {
        // 1. Try to find and verify a User
        const user = await Users.findOne({ "contact.email": email });

        if (user.verification.code !== code) {
            return res.status(400).json({ status: "fail", message: "Invalid code", data: null });
        }

        if (user) {
            // update user
            user.isVerified = true;
            user.verification.code = null;
            user.verification.expiresAt = null; // Stop TTL from deleting verified accounts
            await user.save();

            // create token and session
            const token = generateToken({ id: user._id, role: user.account.role, email: user.contact.email });
            const session = await Sessions.create({ user: user._id, ip, userAgent, token });

            // send token and session to client
            return res.status(200).json({
                status: "success",
                message: "User email verified successfully",
                data: { id: user._id, email: user.contact.email, role: user.account.role, token}
            });
        }
    }

    if (accountType === "school") {
        // 2. Try to find and verify a School
        const school = await Schools.findOne({ "contact.email": email, "administration.verification.code": code });

        if (school) {
            // update school
            school.administration.verification.isVerified = true;
            school.administration.verification.code = null;
            school.administration.verification.expiresAt = null; // Stop TTL from deleting verified accounts
            await school.save();

            // create token and session
            const token = generateToken({ id: school._id, role: school.account.role, email: school.contact.email });
            const session = await Sessions.create({ user: school._id, ip, userAgent, token });

            // send token and session to client
            return res.status(200).json({
                status: "success",
                message: "School email verified successfully",
                data: { id: school._id, email: school.contact.email, name: school.identity.name }
            });
        }
    }

    // 3. If neither found
    return res.status(404).json({ status: "fail", message: "Invalid email", data: null });
})