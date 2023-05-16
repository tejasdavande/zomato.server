const mongoose = require("mongoose");
const DB_username = process.env.DB_username || "node-shop" ;
const DB_password = process.env.DB_password || "node-shop";
const DB_name = process.env.DB_name || "node-shop";

const URL = `mongodb://localhost:27017`;

mongoose.connect(URL , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
db = mongoose.connection;
module.exports = db;
