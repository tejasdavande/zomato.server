const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const zomatoUser = require("../models/user");
const asyncHandler = require("../common/asyncHandler");

// POST /zomatouser/signup
const signup = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const existing = await zomatoUser.findOne({ email });
  if (existing) {
    return res.status(409).json({ message: "Email id already exists." });
  }

  const hash = await bcrypt.hash(password, 10);
  const user = new zomatoUser({
    _id: new mongoose.Types.ObjectId(),
    email,
    password: hash,
  });
  await user.save();

  return res.status(201).json({ message: "User created", userId: user._id });
});

// POST /zomatouser/login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = await zomatoUser.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Authentication failed" });
  }

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "30h" }
  );

  return res.status(200).json({ message: "Auth successful", token });
});

// DELETE /zomatouser/:userId
const deleteUser = asyncHandler(async (req, res) => {
  const result = await zomatoUser.deleteOne({ _id: req.params.userId });
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User deleted" });
});

module.exports = { signup, login, deleteUser };
