const mongoose = require("mongoose");
const orderschema = mongoose.Schema({
  userId: {
    type: String,
  },
  products: {
    orders: [
      {
        items: [],
        payment_id: {
          type: String,
        },
        order_id: {
          type: String,
        },
      },
    ],
  },
});

module.exports = mongoose.model("Orders", orderschema);
