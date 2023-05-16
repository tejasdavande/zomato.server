const mongoose = require("mongoose");

const item = {
  _id: mongoose.Types.ObjectId,
  name: { type: String },
  price: { type: Number },
};

const restaurantSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: {
      type: String,
      require: true,
      unique: true,
    },
    location: { type: String, require: true },
    menucard: [item],
  },
  { versionKey: false }
);

module.exports = mongoose.model("Restaurant", restaurantSchema);
