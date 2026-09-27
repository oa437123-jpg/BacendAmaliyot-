const mongoose = require("mongoose");

const langSchema = new mongoose.Schema({
  name: {type: String},
});

const Lang = model("lang", langSchema);
module.exports = { Lang };
