// ------------Models start ---------------//
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const db = require("../../zomato/zomato_shop/api/common/db");

const restaurantsRoutes = require("./api/routes/restaurant");
const menuroutes = require("../zomato_shop/api/routes/menu");
const userRoutes = require("./api/routes/zomatouser");
const orderRoutes = require("../zomato_shop/api/routes/order");

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// -----------Models end --------------//

//------------routes starts ----------------//

//------------routes end ----------------//

//------------cors start---------//

app.use(cors());

//------------cors end---------//

//-------db start--------//

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function callback() {
  console.log("MongoDB connected successfully");
});

//------db end----------//

//-------------------------ADDING ROUTES AND CONTROLLER START---------------
app.use("/restaurant", restaurantsRoutes);
app.use("/menu", menuroutes);
app.use("/zomatouser", userRoutes);
app.use("/order", orderRoutes);

//-------------------------ADDING ROUTES AND CONTROLLER END---------------

//-------------------------ERROR HANDLING START------------------------------
app.use((req, res, next) => {
  const error = new Error("not found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});
//------------------------- ERROR HANDLING END ------------------------------

module.exports = app;
