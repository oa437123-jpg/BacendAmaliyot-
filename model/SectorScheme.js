const mongoose = require("mongoose");

const sectorSchema = new mongoose.Schema({
  sector_name: {type: String},
});

const Sector = model("sector", sectorSchema);
module.exports = { Sector };
