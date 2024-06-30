const httpStatus = require("http-status");
const userService = require("./user.service");
const mailService = require("./mail.service");
const ApiError = require("../utils/APIError");
const { tokenTypes } = require("../config/tokens");
const config = require("../config/config");
const { OAuth2Client } = require("google-auth-library");
const { User } = require("../models/");
const moment = require("moment");
/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  }
  return user;
};

const clientID = config.google.clientId;
const loginWithGoogle = async (body) => {
  const client = new OAuth2Client(clientID);
  const ticket = await client.verifyIdToken({
    idToken: body,
    audience: clientID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });

  const payload = ticket.getPayload();
  const userid = payload["sub"];
  console.log(payload);
  console.log(userid, "<==============userId");
  if (!payload) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      "something went wrong while connecting to google"
    );
  }
  if (payload && userid) {
    const check = await userService.getUserByEmail(payload.email);
    console.log(check, "<==============THIS IS CHECK");
    if (!check) {
      console.log("creating user");
      const user = await userService.createUser({
        email: payload.email,
        password: "password123!@#",
      });
      return user;
    }
    console.log("user already exists");
    return check;
  }
};

const checkOTP = async (otp) => {
  const user = await User.findOne({ token: otp });
  console.log(user, "<==== user found my token");
  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "wrong otp");
  }
  const diffInMinutes = moment().diff(moment(user.updatedAt), "minutes");

  if (diffInMinutes > 5) {
    throw new ApiError(httpStatus.ACCEPTED, "the OTP you sent has been expired");
  }
  await User.findByIdAndUpdate(user.id, { token: "" }, { new: true });
  return user;
};

const forgetPassword = async (body) => {
  const user = await userService.getUserByEmail(body.email);
  if (!user) {
    throw new ApiError(httpStatus.ACCEPTED, "invalid user email");
  }
  const otp = Date.now().toString().slice(-6);
  const temp = await User.findByIdAndUpdate(
    user.id,
    {
      token: otp,
    },
    { new: true }
  );

  await mailService.forgotPasswordThroughNodeMailer({
    email: user.email,
    token: otp,
  });
  return "OTP sent to your Email";
};

const findUserWithEmail = async (email) => {
  const user = await userService.getUserByEmail(email);
  if (!user) throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect email or password");
  return user;
};

const resendOTPById = async (id) => {
  const otp = Date.now().toString().slice(-6);
  const user = await User.findOneAndUpdate(
    { email: id },
    {
      token: otp,
    }
  );
  await mailService.forgotPasswordThroughNodeMailer({
    mail: user.email,
    token: otp,
  });
};

module.exports = {
  loginUserWithEmailAndPassword,
  loginWithGoogle,
  checkOTP,
  forgetPassword,
  findUserWithEmail,
  resendOTPById,
};
