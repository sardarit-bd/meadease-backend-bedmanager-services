import crypto from 'crypto';
import { redisClient } from "../../config/redis.config.js";
import User from "../../models/User.js";
import { createUserTokens } from "../../utils/createUserToken.js";
import { sendVerificationEmail } from "../../utils/sendEmail.js";
import { setAuthCookie } from "../../utils/setCookie.js";
import uEmailandIdfinder from '../../utils/uEmailandIdfinder.js';

const getMe = async (req, res, next) => {

  const email = uEmailandIdfinder(req, 'email');

  const user = await User.findOne({ email }).select('-password');

  if (!user) {
    return res.status(401).json({ message: "User is not found." });
  }

  // Compare password
  res.json({
    success: true,
    statusCode: 200,
    message: "Retrived User",
    data: user,
  });
}

const googleCallbackController = async (req, res, next) => {
  try {
    let redirectTo = req.query.state ? (req.query.state) : "";

    if (redirectTo.startsWith("/")) {
      redirectTo = redirectTo.slice(1);
    }

    const user = req.user;

    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);
    res.redirect(`${process.env.CORS_ORIGIN}/${redirectTo}`);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Server error", error: err.message });
  }
}

const generateOtp = (length = 6) => {
  const otp = crypto.randomInt(10 ** (length - 1), 10 ** length);

  return otp;
};
const sendOtp = async (req, res) => {
  const { email } = req.body

  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      success: true,
      statusCode: 404,
      message: "User is not found!",
      data: null,
    })
  }

  if (user.isVerified) {
    res.json({
      success: true,
      statusCode: 401,
      message: "User is already verified.",
      data: null,
    });
  }
  const otp = generateOtp();
  const redisKey = `otp:${email}`;

  await redisClient.set(redisKey, otp, {
    expiration: {
      type: "EX",
      value: 6000
    },
  });


  sendVerificationEmail(req.body.email, otp)
  res.json({
    success: true,
    statusCode: 200,
    message: "OTP is sent to your email Successfully.",
    data: null,
  });
}

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body

  const user = await User.findOne({ email });
  if (!user) {
    res.json({
      success: true,
      statusCode: 404,
      message: "User is not found!",
      data: null,
    })
  }

  const redisKey = `otp:${email}`;


  const savedOtp = await redisClient.get(redisKey);

  if (!savedOtp) {
    return res.json({
      success: true,
      statusCode: 404,
      message: "Invalid OTP",
      data: null,
    })
  }

  if (savedOtp !== otp) {
    return res.json({
      success: true,
      statusCode: 404,
      message: "Invalid OTP",
      data: null,
    })
  }

  await Promise.all([
    User.updateOne({ email }, { isVerified: true }, { runValidators: true }),

    redisClient.del([redisKey]),
  ]);
  res.json({
    statusCode: 200,
    success: true,
    message: "OTP is verified Successfully",
    data: null,
  });
}


export { getMe, googleCallbackController, sendOtp, verifyOtp };

