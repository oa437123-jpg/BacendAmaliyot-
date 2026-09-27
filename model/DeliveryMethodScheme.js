const mongoose = require("mongoose");

const deliverymethodSchema = new mongoose.Schema({
  name: {type: String},
});

const DeliveryMethod = model("delivery_method", deliverymethodSchema);
module.exports = { DeliveryMethod };
