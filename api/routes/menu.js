const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu");
const { route } = require("./zomatouser");

// routers ---------------- start----------
router.get("/", getMenu);
router.post("/", checkAuth, createMenu);
router.patch("/:menuId", checkAuth, updateMenu);
router.delete("/:menuId", checkAuth, deleteMenu);

// router --------------------End -------------
module.exports = router;
