const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const { getOrders, createOrder } = require("../controllers/order");

router.get("/", checkAuth, getOrders);
router.post("/", checkAuth, createOrder);

module.exports = router;
