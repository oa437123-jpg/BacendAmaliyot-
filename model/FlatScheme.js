const mongoose = require("mongoose");

const flatSchema = new mongoose.Schema({
  etaj: {type: Number},
  condition: {type: String},
});

const Flat = model("flat", flatSchema);
module.exports = { Flat };
