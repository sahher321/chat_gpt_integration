const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const vendorSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  companyName: {
    type: String,
    required: true,
    minLength: 3,
  },
  product: [{ type: Schema.Types.ObjectId, ref: "product" }],
});

const Vendor =mongoose.model("vendor",vendorSchema);

module.exports = Vendor;