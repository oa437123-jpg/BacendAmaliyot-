const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customer" },
  createdAt: { type: String },
  finishedAt: { type: String },
  status_id: { type: mongoose.Schema.Types.ObjectId, ref: "ticket_status" },
});

const Cart = model("cart", cartSchema);
module.exports = { Cart };
