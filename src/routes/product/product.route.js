const express = require("express");
const productController = require("../../controllers/product.controller");
const upload = require("../../middlewares/multer");
const validate = require("../../middlewares/validate");
const productValidation = require("../../validations/product.validation");
const { verify } = require("../../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .post(verify (), validate(productValidation.getAnswer), productController.getProducts);

module.exports = router;
