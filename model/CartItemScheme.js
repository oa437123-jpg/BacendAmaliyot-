const mongoose = require("mongoose");

const cartitemSchema = new mongoose.Schema({
  cart_id: { type: mongoose.Schema.Types.ObjectId, ref: "cart" },
  ticket_id: { type: mongoose.Schema.Types.ObjectId, ref: "ticket" },
});

const CartItem = model("cart_item", cartitemSchema);
module.exports = { CartItem };
