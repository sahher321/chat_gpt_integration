const express = require("express");
const userRoute = require("./user/user.route");
const productRoute = require("./product/product.route");
// const vendorRoute = require("./vendor/vendor.route");
const authRoute = require("./auth/auth.route");
const router = express.Router();

router.use("/user", userRoute);
router.use("/product", productRoute);
// router.use("/vendor", vendorRoute);
router.use("/auth", authRoute);
module.exports = router;
