const mongoose = require("mongoose");

const customeraddressSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  name: { type: String },
  region_id: { type: mongoose.Schema.Types.ObjectId, ref: "region" },
  district_id: { type: mongoose.Schema.Types.ObjectId, ref: "district" },
  street: { type: String },
  house: { type: String },
  flat_id: { type: mongoose.Schema.Types.ObjectId, ref: "flat" },
  location: { type: String },
  post_index: { type: String },
  info: { type: String },
});

const CustomerAddress = model("customer_address", customeraddressSchema);
module.exports = { CustomerAddress };
