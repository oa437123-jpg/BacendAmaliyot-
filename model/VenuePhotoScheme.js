const mongoose = require("mongoose");

const venuephotoSchema = new mongoose.Schema({
  venue_id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
  url: { type: String },
});

const VenuePhoto = model("venue_photo", venuephotoSchema);
module.exports = { VenuePhoto };
