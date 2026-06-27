const express = require("express");
const checkAuth = require("../middleware/check-auth");
const router = express.Router();

const {
  getMenu,
  createMenu,
  updateMenu,
  deleteMenu,
} = require("../controllers/menu");

router.get("/", getMenu);
router.post("/", checkAuth, createMenu);
router.patch("/:menuId", checkAuth, updateMenu);
router.delete("/:menuId", checkAuth, deleteMenu);

module.exports = router;
