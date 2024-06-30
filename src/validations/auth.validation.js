const Joi = require("joi");
const { password } = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    username: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const googleLogin = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const changePassword = {
  body: Joi.object().keys({
    code: Joi.string().required().min(6),
  }),
};

const resendOTP = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};
module.exports = {
  login,
  logout,
  register,
  googleLogin,
  forgotPassword,
  changePassword,
  resendOTP,
};
