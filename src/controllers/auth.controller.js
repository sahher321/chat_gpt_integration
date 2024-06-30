const httpStatus = require("http-status");
const { authService, tokenService } = require("../services");
const catchAsync = require("../utils/catchAsync");

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const googleLogin = catchAsync(async (req, res, next) => {
  const { token } = req.body;
  const user = await authService.loginWithGoogle(token);
  if (!user) {
    return res.status(400).send({ message: "something went wrong" });
  }
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const user = await authService.forgetPassword(req.body);
  res.status(200).send(user);
});

const resendOTP = catchAsync(async (req, res) => {
  const user = await authService.resendOTPById(req.body.email);
  res.status(httpStatus.CREATED).send(user);
});

const changePassword = catchAsync(async (req, res) => {
  const user = await authService.checkOTP(req.body.code);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.ACCEPTED).send({ user, tokens });
});

module.exports = {
  login,
  googleLogin,
  forgotPassword,
  forgotPassword,
  resendOTP,
  changePassword,
};
