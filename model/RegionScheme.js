const mongoose = require("mongoose");

const regionSchema = new mongoose.Schema({
  name: {type: String},
});

const Region = model("region", regionSchema);
module.exports = { Region };
