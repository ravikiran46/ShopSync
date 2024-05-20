const express = require("express");
const cartrouter = express.Router();
const {
  addToCart,
  getCartItems,
  removeFromCart,
  updateQuantity,
} = require("../Controllers/CartController");

const authorization = require("../middleware/authorization");

cartrouter.get("/", authorization, getCartItems);

cartrouter.post("/", authorization, addToCart);

cartrouter.put("/:id", authorization, updateQuantity);

cartrouter.delete("/:id", authorization, removeFromCart);

module.exports = cartrouter;
