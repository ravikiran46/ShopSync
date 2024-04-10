const cartModel = require("../schema/Cartschema");

const addToCart = async (req, res) => {
  const { itemid, quantity, name, image, price } = req.body;

  try {
    let user = await cartModel.findOne({ userId: req.user.id });
    if (user) {
      let itemindex = user.products.findIndex(
        (product) => product.productId === itemid
      );
      if (itemindex !== -1) {
        user.products[itemindex].quantity += Number(quantity);
        await user.save();
        res.json({
          status: 201,
          message: "Item quantity updated in your Cart",
        });
      } else {
        let product = {
          productId: itemid,
          quantity: Number(quantity),
          name: name,
          image: image,
          price: price,
        };
        console.log(product);
        user.products.push(product);
        await user.save();
        res.json({ status: 201, message: "Item add to your Cart" });
      }
    } else {
      let newcart = new cartModel({
        userId: req.user.id,
        products: [
          {
            productId: itemid,
            quantity: Number(quantity),
            name: name,
            image: image,
            price: price,
          },
        ],
      });
      console.log(newcart);
      await newcart.save();
      res.json({
        status: 201,
        message: "Item added to your cart successfully.",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({ status: 500, message: "Internal server error" });
  }
};

const getCartItems = async (req, res) => {
  try {
    const usercart = await cartModel
      .findOne({ userId: req.user.id })
      .populate("products");
    if (!usercart) return res.json({ status: 404, message: "No User Found" });
    return res.json({ status: 200, usercart: usercart });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Something went wrong!" });
  }
};

const removeFromCart = async (req, res) => {
  const produtId = req.params.id;
  try {
    let usercart = await cartModel.findOne({ userId: req.user.id });
    if (!usercart) return res.json({ status: 404, message: "No User Found" });

    usercart.products.pull({ productId: produtId });
    await usercart.save();

    return res.json({ status: 200, message: "Removed from Cart Successfully" });
  } catch (error) {
    console.log(error);
    return res.json({ status: 500, message: "Something went wrong!" });
  }
};

const updateQuantity = async (req, res) => {};

module.exports = {
  addToCart,
  getCartItems,
  removeFromCart,
  updateQuantity,
};
