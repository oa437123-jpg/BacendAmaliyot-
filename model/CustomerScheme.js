const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  phone: { type: String },
  hashed_password: { type: String },
  email: { type: String },
  birth_date: { type: Date },
  gender_id: { type: mongoose.Schema.Types.ObjectId, ref: "gender" },
  lang_id: { type: mongoose.Schema.Types.ObjectId, ref: "lang" },
  hashed_refresh_token: { type: String },
});

const Customer = model("customer", customerSchema);
module.exports = { Customer };
