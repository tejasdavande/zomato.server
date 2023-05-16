const mongoose = require("mongoose");
const Menu = require("../models/menu");

const getMenu = async (req, res, next) => {
  try {
    const menulist = await Menu.find({});

    if (menulist) {
      res.status(200).json(menulist);
    } else {
      res.status(404).json({
        message: "No products found.",
      });
    }
  } catch (error) {
    throw error;
  }
};

const createMenu = async (req, res, next) => {
  try {
    console.log("tejassajsjasjasjjsa");
    const menulist = await Menu.find({});
    if (menulist >= 1) {
      res.status(200).json({
        message: "menu already Exist",
      });
    } else {
      const menulist = new Menu({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
      });
      const createmenu = await menulist.save();
      if (createmenu) {
        res.status(200).json({
          message: "Menu added succesfully In In Menucard",
        });
      } else {
        res.status(201).json({
          message: "Menu not added into the Menucard please try again",
        });
      }
    }
  } catch (error) {
    throw error;
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const id = req.params.menuId;
    const menuupdate = await Menu.updateOne({ _id: id }, { $set: req.body });
    if (menuupdate) {
      res.status(200).json({
        message: " menu updated succesfully",
      });
    } else {
      res.status(404).json({
        message: "Menu not upated.Please try again",
      });
    }
  } catch (error) {
    throw error;
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const id = req.params.menuId;
    const menudelete = await Menu.deleteOne({ _id: id });
    if (menudelete) {
      res.status(200).json({ message: "menu deleted sucessfully" });
    } else {
      res.status(404).json({ message: " Please try again menu not deleted" });
    }
  } catch (error) {}
};

module.exports = { getMenu, createMenu, updateMenu, deleteMenu };
