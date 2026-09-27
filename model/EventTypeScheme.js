const mongoose = require("mongoose");

const eventtypeSchema = new mongoose.Schema({
  name: { type: String },
  parent_event_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "event_type" },
});

const EventType = model("event_type", eventtypeSchema);
module.exports = { EventType };
