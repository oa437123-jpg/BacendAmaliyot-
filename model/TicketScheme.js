const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema({
  event_id: { type: mongoose.Schema.Types.ObjectId, ref: "event" },
  seat_id: { type: mongoose.Schema.Types.ObjectId, ref: "seat" },
  price: { type: Number },
  service_fee: { type: Number },
  status_id: { type: mongoose.Schema.Types.ObjectId, ref: "ticket_status" },
  ticket_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "ticket_type" },
});

const Ticket = model("ticket", ticketSchema);
module.exports = { Ticket };
