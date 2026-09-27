const mongoose = require("mongoose");

const genderSchema = new mongoose.Schema({
  name: {type: String},
});

const Gender = model("gender", genderSchema);
module.exports = { Gender };
