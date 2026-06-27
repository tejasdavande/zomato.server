const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1, default: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    restaurantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
      required: true,
    },
    restaurantName: { type: String },
    items: { type: [orderItemSchema], required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
