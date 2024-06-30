const express = require("express");
const vendorController = require("../../controllers/vendor.controller.js");

const router = express.Router();

router
  .route("/")
  .get(vendorController.getVendors)
  .post(vendorController.createVendor);

router
  .route("/:id")
  .get(vendorController.getVendor)
  .delete(vendorController.deleteVendor)
  .patch(vendorController.updateVendor);

module.exports = router;
