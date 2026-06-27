const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");
const asyncHandler = require("../common/asyncHandler");

// GET /restaurant
const getRestaurants = asyncHandler(async (req, res) => {
  const restaurants = await Restaurant.find();
  return res.status(200).json({ count: restaurants.length, restaurants });
});

// GET /restaurant/:restaurantId
const getRestaurant = asyncHandler(async (req, res) => {
  const restaurant = await Restaurant.findById(req.params.restaurant);
  if (!restaurant) {
    return res.status(404).json({ message: "Restaurant not found." });
  }
  return res.status(200).json(restaurant);
});

// POST /restaurant
const createRestaurant = asyncHandler(async (req, res) => {
  const { name, location, menucard } = req.body;
  if (!name || !location) {
    return res.status(400).json({ message: "name and location are required" });
  }

  const exists = await Restaurant.findOne({ name });
  if (exists) {
    return res.status(409).json({ message: "Restaurant already exists" });
  }

  const restaurant = new Restaurant({
    _id: new mongoose.Types.ObjectId(),
    name,
    location,
    menucard: menucard || [],
  });
  const created = await restaurant.save();
  return res.status(201).json(created);
});

// PUT /restaurant/:restaurantId  — add items to the restaurant's menucard
const updateRestaurant = asyncHandler(async (req, res) => {
  const updated = await Restaurant.findByIdAndUpdate(
    req.params.restaurantId,
    { $push: { menucard: { $each: req.body.menucard || [] } } },
    { new: true, runValidators: true }
  );
  if (!updated) {
    return res.status(404).json({ message: "Restaurant not found." });
  }
  return res.status(200).json({ message: "Restaurant updated", restaurant: updated });
});

// DELETE /restaurant/:restaurantId
const deleteRestaurant = asyncHandler(async (req, res) => {
  const deleted = await Restaurant.findByIdAndDelete(req.params.restaurantId);
  if (!deleted) {
    return res.status(404).json({ message: "Restaurant not found." });
  }
  return res.status(200).json({ message: "Restaurant deleted" });
});

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};
