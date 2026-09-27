const mongoose = require("mongoose");

const discountSchema = new mongoose.Schema({
  discount: {type: String},
  finish_date: {type: Date},
});

const Discount = model("discount", discountSchema);
module.exports = { Discount };
