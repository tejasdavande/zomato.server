const mongoose = require("mongoose");
const Restaurant = require("../models/restaurant");

const getRestaurants = async (req, res, next) => {
  try {
    const restaurant = await Restaurant.find({});
    if (restaurant.length >= 0) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({
        message: "Restaurant Not found.",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createRestaurant = async (req, res, next) => {
  try {
    const Restaurantlist = await Restaurant.find({});
    if (Restaurantlist >= 1) {
      res
        .status(404)
        .json({ message: " restaurant already present in the list" });
    } else {
      console.log("dhhghhhhhhhhhkjjhkhjkhjkhjk", req.body.menucard[0].menuName);
      const restaurant = new Restaurant({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        location: req.body.location,
        menucard: req.body.menucard,
      });
      const createRestaurantResponse = await restaurant.save();
      if (createRestaurantResponse) {
        res.status(201).send(createRestaurantResponse);
      } else {
        res.status(404).send({
          message: "Restaurant not created.",
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

const getRestaurant = async (req, res, next) => {
  try {
    const id = req.params.restaurant;
    const restaurant = await Restaurant.findOne({ _id: id });
    if (restaurant) {
      res.status(200).json(restaurant);
    } else {
      res.status(404).json({
        message: "Restaurant Not found.",
      });
    }
  } catch (error) {}
};

const updateRestaurant = async (req, res, next) => {
  try {
    const id = req.params.restaurantId;
    console.log(id, req.body);
    const restaurantupdate = await Restaurant.updateOne(
      { _id: id },
      { $push: req.body },
      { new: true, upsert: true }
    );
    console.log("hjdshjkdshjkdshj", restaurantupdate);
    if (restaurantupdate) {
      res.status(200).json({
        message: " restaurant updated succesfully",
      });
    } else {
      res.status(404).json({
        message: "restaurant not upated.Please try again",
      });
    }
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  // deleteProduct,
};
