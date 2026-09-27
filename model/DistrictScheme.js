const mongoose = require("mongoose");

const districtSchema = new mongoose.Schema({
  name: { type: String },
  region_id: { type: mongoose.Schema.Types.ObjectId, ref: "region" },
});

const District = model("district", districtSchema);
module.exports = { District };
