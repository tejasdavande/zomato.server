const mongoose = require("mongoose");

const menuSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, require: true },
  price: { type: Number, require: true },
});

module.exports = mongoose.model("Menu", menuSchema);
