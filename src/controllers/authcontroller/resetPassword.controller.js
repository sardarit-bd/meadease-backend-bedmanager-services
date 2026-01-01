import bcrypt from "bcryptjs";
import User from "../../models/User.js";


export const resetPassword = async (req, res, next) => {
    try {
        const userId = req.headers['x-user-id']
        console.log("User ID for password reset:", userId);
        const { password } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }


        user.password = await bcrypt.hash(
            password,
            Number(10)
        );
        user.save();


        res.json({
            success: true,
            statusCode: 200,
            message: "Password Reset Successfully!",
            data: null,
        });
    } catch (err) {
        console.log(err)
        next(err)
    }
}