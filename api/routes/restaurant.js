const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

// --Controller ----   ////

const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurant");

// Routes--     ----////

router.get("/", checkAuth, getRestaurants);
router.get("/:restaurant", checkAuth, getRestaurant);
router.post("/", checkAuth, createRestaurant);
router.put("/:restaurantId", checkAuth, updateRestaurant);
// router.delete("/restaurantId", checkAuth, deleteRestaurant);

module.exports = router;
