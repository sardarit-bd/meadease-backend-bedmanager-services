import { generateToken, verifyToken } from "../utils/jwt.js";


export const createUserTokens = (user) => {
    const jwtPayload = {
        userId: user._id,
        email: user.email,
        role: user.role,
    };
    const accessToken = generateToken(
        jwtPayload,
        process.env.JWT_ACCESS_SECRET
    );
    const refreshToken = generateToken(
        jwtPayload,
        process.env.JWT_REFRESH_SECRET
    );

    return {
        accessToken,
        refreshToken
    }
};

export const createNewAccessTokenWithRefreshToken = async (refreshToken) => {
    const verifiedRefreshToke = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET)

    const isUserExist = await User.findOne({ email: verifiedRefreshToke.email })

    if (!isUserExist) {
        throw new AppError(httpStatus.NOT_FOUND, "User does not exist")
    }
    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }

    const accessToken = generateToken(jwtPayload, process.env.JWT_ACCESS_SECRET)

    return accessToken
}