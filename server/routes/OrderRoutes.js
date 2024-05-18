const express = require("express");
const orderroutes = express.Router();
const ordersmodel = require("../schema/OrderSchema");
const authorization = require("../middleware/authorization");

const userorders = async (req, res) => {
  try {
    const orders = await ordersmodel.findOne({ userId: req.user.id });
    if (orders) {
      res.json({ status: 200, res: orders.products });
    } else {
      res.json({ status: 404, msg: "No orders yet!" });
    }
  } catch (error) {
    console.log(error);
  }
};

orderroutes.get("/", authorization, userorders);

module.exports = orderroutes;
