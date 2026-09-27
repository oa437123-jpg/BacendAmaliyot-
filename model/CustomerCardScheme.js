const mongoose = require("mongoose");

const customercardSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  name: { type: String },
  phone: { type: String },
  number: { type: String },
  year: { type: String },
  month: { type: String },
  is_active: { type: Boolean },
  is_main: { type: Boolean },
});

const CustomerCard = model("customer_card", customercardSchema);
module.exports = { CustomerCard };
