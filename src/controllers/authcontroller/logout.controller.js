export const logout = async (req, res, next) => {
    try {
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });
        res.json({
            success: true,
            statusCode: 200,
            message: "User Logged Out Successfully!",
            data: null,
        });
    } catch (err) {
        console.log(err)
        next(err)
    }
}
