const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");

const orderschema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  restaurantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  restaurantNamee: { type: String },
  items: [
    {
      name: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Order", orderschema);
