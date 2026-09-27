const mongoose = require("mongoose");

const tickettypeSchema = new mongoose.Schema({
  ticket_type: {type: String},
  name: {type: String},
  color: {type: String},
});

const TicketType = model("ticket_type", tickettypeSchema);
module.exports = { TicketType };
