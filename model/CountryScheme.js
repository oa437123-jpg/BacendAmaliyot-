const mongoose = require("mongoose");

const countrySchema = new mongoose.Schema({
  country_name: {type: String},
});

const Country = model("country", countrySchema);
module.exports = { Country };
