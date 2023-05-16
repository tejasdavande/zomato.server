const mongoose = require("mongoose");
const Order = require("../models/order");
const Restaurant = require("../models/restaurant");

const getOrders = async (req, res, next) => {
  try {
    const getorderresponse = await Order.find({});
    if (getorderresponse) {
      res.status(200).json(getorderresponse);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    throw error;
  }
};

const createOrder = async (req, res, next) => {
  try {
    const restaurantId = req.body.restaurantId;

    const { name: resturantName } = await Restaurant.findOne(
      { _id: restaurantId },
      { name: 1, _id: 0 }
    );
    if (resturantName) {
      const orderlist = new Order({
        _id: new mongoose.Types.ObjectId(),
        restaurantId: new mongoose.Types.ObjectId(restaurantId),
        resturantNamee: resturantName,
        items: req.body.items,
      });
      const order = await orderlist.save();
      if (order) {
        res.status(200).json({ message: "order was created successfully" });
      } else {
        res
          .status(404)
          .json({ message: "order was not created please try again" });
      }
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { getOrders, createOrder };
