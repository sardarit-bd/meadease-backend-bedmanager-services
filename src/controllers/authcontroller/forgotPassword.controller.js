import jwt from 'jsonwebtoken';
import User from "../../models/User.js";
import { sendResetPasswordEmail } from "../../utils/sendEmail.js";



export const forgotPassword = async (req, res, next) => {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        return res.json({
            success: false,
            statusCode: 404,
            message: "User does not found!",
            data: null,
        });
    }

    const JwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };

    const resetToken = jwt.sign(JwtPayload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: "10m",
    });

    const resetUrlLink = `${process.env.CORS_ORIGIN}/reset-password?id=${user._id}&token=${resetToken}`;

    sendResetPasswordEmail(user.email, resetUrlLink);

    res.json({
        success: true,
        statusCode: 200,
        message: "Email Sent Successfully!",
        data: null,
    });
}