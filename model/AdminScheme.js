const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {type: String},
  login: {type: String},
  hashed_password: {type: String},
  is_active: {type: Boolean},
  is_creator: {type: Boolean},
  hashed_refresh_token: {type: String},
});

const Admin = model("admin", adminSchema);
module.exports = { Admin };
