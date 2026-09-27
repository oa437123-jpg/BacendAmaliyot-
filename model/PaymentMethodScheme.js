const mongoose = require("mongoose");

const paymentmethodSchema = new mongoose.Schema({
  name: {type: String},
});

const PaymentMethod = model("payment_method", paymentmethodSchema);
module.exports = { PaymentMethod };
