const express = require("express");

const paymentrouter = express.Router();

const { checkout, verify } = require("../Controllers/PaymentController");
const authorization = require("../middleware/authorization");

paymentrouter.post("/", checkout);

paymentrouter.post("/paymentverify", authorization, verify);

module.exports = paymentrouter;
