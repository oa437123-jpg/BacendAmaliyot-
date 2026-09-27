const mongoose = require("mongoose");

const ticketstatusSchema = new mongoose.Schema({
  name: {type: String},
});

const TicketStatus = model("ticket_status", ticketstatusSchema);
module.exports = { TicketStatus };
