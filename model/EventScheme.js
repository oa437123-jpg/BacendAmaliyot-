const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String },
  photo: { type: String },
  start_date: { type: Date },
  start_time: { type: String },
  finish_date: { type: Date },
  finish_time: { type: String },
  info: { type: String },
  event_type_id: { type: mongoose.Schema.Types.ObjectId, ref: "event_type" },
  human_category_id: { type: mongoose.Schema.Types.ObjectId, ref: "human_category" },
  venue_id: { type: mongoose.Schema.Types.ObjectId, ref: "venue" },
  lang_id: { type: mongoose.Schema.Types.ObjectId, ref: "lang" },
  release_date: { type: Date },
});

const Event = model("event", eventSchema);
module.exports = { Event };
