const express = require("express");
const { valid } = require("joi");
const { authController } = require("../../controllers");
const auth = require("../../middlewares/auth");
const validate = require("../../middlewares/validate");
const authValidation = require("../../validations/auth.validation");

const router = express.Router();

router.post("/login", validate(authValidation.login), authController.login);
router.post("/google-auth", validate(authValidation.googleLogin), authController.googleLogin);
router.post(
  "/forgot-password",
  validate(authValidation.forgotPassword),
  authController.forgotPassword
);

router
  .route("/change-password")
  .post(validate(authValidation.changePassword), authController.changePassword); //code sent to change password

router.route("/resend/:id").get(validate(authValidation.resendOTP), authController.resendOTP);
module.exports = router;
