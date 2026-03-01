import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


const generateToken = (data) => {
    const token = jwt.sign({...data.payload}, process.env.JWT_SECRET);
    return token;
}

export default generateToken;