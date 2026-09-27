const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
  createdAt: { type: String },
  finished: { type: String },
  payment_method_id: { type: mongoose.Schema.Types.ObjectId, ref: "payment_method" },
  delivery_method_id: { type: mongoose.Schema.Types.ObjectId, ref: "delivery_method" },
  discount_id: { type: mongoose.Schema.Types.ObjectId, ref: "discount" },
  status_id: { type: mongoose.Schema.Types.ObjectId, ref: "ticket_status" },
});

const Booking = model("booking", bookingSchema);
module.exports = { Booking };
