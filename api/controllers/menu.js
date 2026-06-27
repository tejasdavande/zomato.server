const mongoose = require("mongoose");
const Menu = require("../models/menu");
const asyncHandler = require("../common/asyncHandler");

// GET /menu
const getMenu = asyncHandler(async (req, res) => {
  const menu = await Menu.find();
  return res.status(200).json({ count: menu.length, menu });
});

// POST /menu
const createMenu = asyncHandler(async (req, res) => {
  const { name, price } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ message: "name and price are required" });
  }

  const item = new Menu({
    _id: new mongoose.Types.ObjectId(),
    name,
    price,
  });
  const created = await item.save();
  return res.status(201).json({ message: "Menu item added", item: created });
});

// PATCH /menu/:menuId
const updateMenu = asyncHandler(async (req, res) => {
  const updated = await Menu.findByIdAndUpdate(
    req.params.menuId,
    { $set: req.body },
    { new: true, runValidators: true }
  );
  if (!updated) {
    return res.status(404).json({ message: "Menu item not found" });
  }
  return res.status(200).json({ message: "Menu item updated", item: updated });
});

// DELETE /menu/:menuId
const deleteMenu = asyncHandler(async (req, res) => {
  const deleted = await Menu.findByIdAndDelete(req.params.menuId);
  if (!deleted) {
    return res.status(404).json({ message: "Menu item not found" });
  }
  return res.status(200).json({ message: "Menu item deleted" });
});

module.exports = { getMenu, createMenu, updateMenu, deleteMenu };
