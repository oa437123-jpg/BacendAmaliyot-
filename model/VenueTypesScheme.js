const mongoose = require("mongoose");

const venuetypesSchema = new mongoose.Schema({
  venue_id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
  type_id: { type: mongoose.Schema.Types.ObjectId, ref: "types" },
});

const VenueTypes = model("venue_types", venuetypesSchema);
module.exports = { VenueTypes };
