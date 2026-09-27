const mongoose = require("mongoose");

const seatSchema = new mongoose.Schema({
  sector_id: { type: mongoose.Schema.Types.ObjectId, ref: "sector" },
  row_number: { type: Number },
  number: { type: Number },
  venue_id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
  seat_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "seat_type" },
  location_in_schema: { type: String },
});

const Seat = model("seat", seatSchema);
module.exports = { Seat };
