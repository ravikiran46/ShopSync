const express = require("express");
const orderrouter = express.Router();
const ordersmodel = require("../schema/OrderSchema");
const authorization = require("../middleware/authorization");

const userorders = async (req, res) => {
  try {
    const orders = await ordersmodel.findOne({ userId: req.user.id });
    if (orders) {
      return res.json({ status: 200, res: orders.products });
    } else {
      return res.json({ status: 404, msg: "No orders yet!" });
    }
  } catch (error) {
    console.log(error);
  }
};

orderrouter.get("/", authorization, userorders);

module.exports = orderrouter;
