const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const { getOrders, createOrder } = require("../controllers/order");

router.get("/", getOrders);
router.post("/", createOrder);
// router.get("/:orderId", getOrder);
// router.patch("/:orderId", updateOrder);
// router.delete("/:orderId", deleteOrder);

module.exports = router;
