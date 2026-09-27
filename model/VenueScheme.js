const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
  name: { type: String },
  address: { type: String },
  location: { type: String },
  site: { type: String },
  phone: { type: String },
  schema: { type: String },
  region_id: { type: mongoose.Schema.Types.ObjectId, ref: "region" },
  district_id: { type: mongoose.Schema.Types.ObjectId, ref: "district" },
});

const Venue = model("venue", venueSchema);
module.exports = { Venue };
