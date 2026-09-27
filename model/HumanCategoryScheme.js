const mongoose = require("mongoose");

const humancategorySchema = new mongoose.Schema({
  name: { type: String },
  start_age: { type: Number },
  finish_age: { type: Number },
  gender_id: { type: mongoose.Schema.Types.ObjectId, ref: "gender" },
});

const HumanCategory = model("human_category", humancategorySchema);
module.exports = { HumanCategory };
