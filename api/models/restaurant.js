const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    price: { type: Number, required: true, min: 0 },
  },
  { _id: false }
);

const restaurantSchema = new mongoose.Schema(
  {
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true, trim: true },
    location: { type: String, required: true, trim: true },
    menucard: { type: [menuItemSchema], default: [] },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
