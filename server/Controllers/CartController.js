const cartModel = require("../schema/Cartschema");

const addToCart = async (req, res) => {
  const { itemid, quantity, name, image, price } = req.body;
  let totalamount;
  try {
    let user = await cartModel.findOne({ userId: req.user.id });
    if (user) {
      let itemindex = user.products.findIndex(
        (product) => product.productId === itemid
      );
      if (itemindex !== -1) {
        user.products[itemindex].quantity += Number(quantity);
        totalamount = Number(quantity) * user.products[itemindex].price;
        user.totalamount += totalamount;
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
        totalamount =
          user.products[user.products.length - 1].quantity *
          user.products[user.products.length - 1].price;
        user.totalamount += totalamount;
        await user.save();
        res.json({
          status: 201,
          message: "Item add to your Cart",
        });
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
        totalamount: Number(quantity) * Number(price),
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

    let itemindex = usercart.products.findIndex(
      (product) => product.productId === produtId
    );
    if (itemindex !== -1) {
      let totalamount =
        usercart.products[itemindex].quantity *
        usercart.products[itemindex].price;
      usercart.products.pull({ productId: produtId });
      usercart.totalamount -= totalamount;
      await usercart.save();

      res.json({ status: 200, message: "Removed from Cart Successfully" });
    } else {
      res.json({ status: 404, message: "Item not found in Cart" });
    }
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
