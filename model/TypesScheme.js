const mongoose = require("mongoose");

const typesSchema = new mongoose.Schema({
  name: {type: String},
});

const Types = model("types", typesSchema);
module.exports = { Types };
