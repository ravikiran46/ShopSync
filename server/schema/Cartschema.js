const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  userId: {
    type: String,
  },
  products: [
    {
      productId: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
    },
  ],
  totalamount: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("Cart", cartSchema);
