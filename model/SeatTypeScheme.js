const mongoose = require("mongoose");

const seattypeSchema = new mongoose.Schema({
  name: {type: String},
});

const SeatType = model("seat_type", seattypeSchema);
module.exports = { SeatType };
