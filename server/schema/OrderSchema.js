const mongoose = require("mongoose");

const orderschema = mongoose.Schema({
  userId: {
    type: String,
  },
  productId: {
    type: String,
    required: true,
  },
  ispaid: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Orders", cartSchema);
