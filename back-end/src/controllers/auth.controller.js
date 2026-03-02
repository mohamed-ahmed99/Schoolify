import asyncHandler from '../middleware/asyncHandler.js'
import Users from '../models/users/User.model.js'
import Schools from '../models/School.model.js'
import Sessions from '../models/Sessions.model.js'
import generateToken from '../utils/generateToken.js'
import bcrypt from 'bcrypt'





export const verifyEmail = asyncHandler(async (req, res) => {
    const { email, code, accountType, schoolId } = req.body;

    if (!email || !code || !accountType) {
        return res.status(400).json({ status: "fail", message: "Email, code and accountType are required", data: null });
    }

    const ip = req.ip;
    const userAgent = req.headers['user-agent'];


    if (accountType === "user") {
        // 1. Try to find and verify a User
        const user = await Users.findOne({ "contact.email": email });


        if (user) {
            // check code
            if (user.verification.code != code) {
                return res.status(400).json({ status: "fail", message: "Invalid code", data: null });
            }

            // check school
            const school = await Schools.findById(schoolId);
            if (!school) {
                return res.status(404).json({ status: "fail", message: "School not found", data: null });
            }

            // check if school already has a head teacher
            if (school.headTeacher) {
                return res.status(400).json({ status: "fail", message: "This school already has a head teacher", data: null });
            }

            // update school
            school.headTeacher = user._id;
            await school.save();

            // update user
            user.isVerified = true;
            user.school = school._id;
            user.verification.code = null;
            user.verification.expiresAt = null; // Stop TTL from deleting verified accounts
            await user.save();



            // create token and session
            const token = generateToken({ id: user._id, role: user.account.role, email: user.contact.email });
            await Sessions.create({ user: user._id, ip, userAgent, token });

            // send token and session to client
            return res.status(200).json({
                status: "success",
                message: "User email verified successfully",
                data: { id: user._id, email: user.contact.email, role: user.account.role, token }
            });
        }
    }

    else if (accountType === "school") {
        // 2. Try to find and verify a School
        const school = await Schools.findOne({ "contact.email": email });

        if (!school) {
            return res.status(404).json({ status: "fail", message: "This email is not registered in any school", data: null });
        }

        // check code
        if (school.verification.code != code) {
            return res.status(400).json({ status: "fail", message: "Invalid code", data: null });
        }

        // update school
        school.isVerified = true;
        school.verification.code = null;
        school.verification.expiresAt = null; // Stop TTL from deleting verified accounts
        await school.save();

        // create token and session
        const token = generateToken({ id: school._id, role: school.account.role, email: school.contact.email });
        await Sessions.create({ user: school._id, ip, userAgent, token });

        // send token and data to client
        return res.status(200).json({
            status: "success",
            message: "School email verified successfully",
            data: { id: school._id, email: school.contact.email, role: school.account.role, token }
        });
    }

    return res.status(404).json({ status: "fail", message: "This email is not registered or account type is invalid", data: null });
})





/////////////////// sign in
export const signIn = asyncHandler(async (req, res) => {
    const { email, password, accountType } = req.body;

    if (!email || !password || !accountType) {
        return res.status(400).json({ status: "fail", message: "Email, password and accountType are required", data: null });
    }

    const ip = req.ip;
    const userAgent = req.headers['user-agent'];

    if (accountType === "user") {
        const user = await Users.findOne({ "contact.email": email }).select("+account.password");

        if (!user) {
            return res.status(400).json({ status: "fail", message: "Invalid email or password", data: null });
        }

        const isMatch = await bcrypt.compare(password, user.account.password);
        if (!isMatch) {
            return res.status(400).json({ status: "fail", message: "Incorrect password", data: null });
        }

        if (!user.isVerified) {
            return res.status(400).json({ status: "fail", message: "Please verify your email first", order: "verify email", data: null });
        }

        const token = generateToken({ id: user._id, role: user.account.role, email: user.contact.email });
        await Sessions.create({ user: user._id, ip, userAgent, token });

        return res.status(200).json({
            status: "success",
            message: "Signed in successfully",
            data: { id: user._id, email: user.contact.email, role: user.account.role, token }
        });

    } else if (accountType === "school") {
        const school = await Schools.findOne({ "contact.email": email }).select("+account.password");

        if (!school) {
            return res.status(400).json({ status: "fail", message: "Invalid email or password", data: null });
        }

        const isMatch = await bcrypt.compare(password, school.account.password);
        if (!isMatch) {
            return res.status(400).json({ status: "fail", message: "Invalid email or password", data: null });
        }

        if (!school.isVerified) {
            return res.status(400).json({ status: "fail", message: "Please verify your school email first", data: null });
        }

        const token = generateToken({ id: school._id, role: school.account.role, email: school.contact.email });
        await Sessions.create({ user: school._id, ip, userAgent, token });

        return res.status(200).json({
            status: "success",
            message: "Signed in successfully",
            data: { id: school._id, email: school.contact.email, role: school.account.role, token }
        });
    } else {
        return res.status(400).json({ status: "fail", message: "Invalid account type", data: null });
    }
})
