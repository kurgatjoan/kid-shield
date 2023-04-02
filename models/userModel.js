const { Schema, model } = require("mongoose");

const userModel = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  restricted: { type: Array },
});

module.exports = model("User", userModel);
