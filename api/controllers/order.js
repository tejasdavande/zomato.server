const mongoose = require("mongoose");
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");
const asyncHandler = require("../common/asyncHandler");

// GET /order
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find();
  return res.status(200).json({ count: orders.length, orders });
});

// POST /order
const createOrder = asyncHandler(async (req, res) => {
  const { restaurantId, items } = req.body;
  if (!restaurantId || !Array.isArray(items) || items.length === 0) {
    return res
      .status(400)
      .json({ message: "restaurantId and a non-empty items array are required" });
  }

  const restaurant = await Restaurant.findById(restaurantId).select("name");
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found" });
  }

  const order = new Order({
    _id: new mongoose.Types.ObjectId(),
    restaurantId: restaurant._id,
    restaurantName: restaurant.name,
    items,
  });
  const created = await order.save();

  return res.status(201).json({ message: "Order created", order: created });
});

module.exports = { getOrders, createOrder };
