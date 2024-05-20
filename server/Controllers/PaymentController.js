const Razorpay = require("razorpay");
const crypto = require("crypto");
const ordermodel = require("../schema/OrderSchema");
const schema = require("../schema/schema");
const { transporter } = require("../utills/sendmail");

const razor_instance = new Razorpay({
  key_id: process.env.Razor_key_id,
  key_secret: process.env.Razor_key_secret,
});

const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount) * 100,
    currency: "INR",
  };
  try {
    const order = await razor_instance.orders.create(options);
    res.json({
      status: 200,
      msg: "user exists",
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 400,
    });
  }
};

const verify = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature, items } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.Razor_key_secret)
    .update(body.toString())
    .digest("hex");
  try {
    let user = await ordermodel.findOne({ userId: req.user.id });
    let mailuser = await schema.findOne({ _id: req.user.id });
    if (expectedSignature === razorpay_signature) {
      if (user) {
        user.products.orders.push({
          items: items,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
        });
        await user.save();
        console.log("User order is updated!");
        const mailoptions = {
          from: {
            name: "ShopSync",
            address: process.env.EMAIL,
          },
          to: mailuser.email,
          subject: "Order Details!",
          html: `<h1>Hi ${mailuser.name}</h1>
          <h2>Your Product will be Delivered at 20th May</h2>
          <img  src=${items[0].image} alt="item1"/>
          <p>${items[0].name}</p>
          <h3>Thank you for shopping 🥰</h3>`,
        };
        transporter.sendMail(mailoptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              status: 200,
              msg: `Email has been sent ${info.response}`,
            });
          }
        });
      } else {
        let newuserorder = new ordermodel({
          userId: req.user.id,
        });
        newuserorder.products.orders.push({
          items: items,
          payment_id: razorpay_payment_id,
          order_id: razorpay_order_id,
        });
        await newuserorder.save();
        console.log("New user order is added!");
        const mailoptions = {
          from: {
            name: "ShopSync",
            address: process.env.EMAIL,
          },
          to: mailuser.email,
          subject: "Order Details!",
          html: `<h1>Hi ${mailuser.name}</h1>
          <h2>Your Product will be Delivered at 20th May</h2>
          <img  src=${items[0].image} alt="item1"/>
          <p>${items[0].name}</p>
          <h3>Thank you for shopping 🥰</h3>`,
        };
        transporter.sendMail(mailoptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            res.json({
              status: 200,
              msg: `Email  has been sent ${info.response}`,
            });
          }
        });
      }
      console.log("payment success");
    } else {
      console.log("payment failed");
      return res.redirect("/failed");
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  checkout,
  verify,
};
