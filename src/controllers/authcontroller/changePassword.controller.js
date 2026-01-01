import bcrypt from "bcryptjs";
import User from "../../models/User.js";


export const changePassword = async (req, res, next) => {
    const decodedToken = req.user;

    const newPassword = req.body.newPassword;
    const oldPassword = req.body.oldPassword;

    const user = await User.findById(decodedToken.userId);

    const isOldPasswordMatched = await bcrypt.compare(
        oldPassword,
        user?.password
    );


    if (!isOldPasswordMatched) {
        return res.json({
            success: false,
            statusCode: 400,
            message: "Password does not matched!",
            data: null,
        });
    }

    user.password = await bcrypt.hash(
        newPassword,
        Number(10)
    );
    user.save();

    res.json({
        success: true,
        statusCode: 200,
        message: "Password Reset Successfully!",
        data: null,
    });
}
