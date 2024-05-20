import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import CountToggle from "../components/CountToggle";

const priceformat = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

const Payment = () => {
  const [orders, setorders] = useState([]);
  const [totalamount, settotalamount] = useState(0);
  const [loading, setloading] = useState(false);
  const token = window.localStorage.getItem("token");

  const handleorderdata = async () => {
    try {
      let res = await axios.get(
        "https://ecommerce-xi-wheat-32.vercel.app/cart/",
        {
          headers: {
            "x-aut-token": `${token}`,
          },
        }
      );
      if (res.status === 200) {
        setorders(res.data.usercart.products);
        settotalamount(res.data.usercart.totalamount);
      } else {
        console.log(res.status);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlecheckout = async (totalamount) => {
    try {
      let res = await axios.post(
        "https://ecommerce-xi-wheat-32.vercel.app/checkout/",
        {
          amount: totalamount,
        }
      );
      const options = {
        key: process.env.REACT_APP_Razor_key_id,
        amount: res.data.order.amount,
        currency: "INR",
        name: "ShopSync",
        description: "Test Transaction  for testing purpose",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShyEfii06Lr75Iqup2IRHhUmdqa9uVShkJxxynuAhEgw&s",
        order_id: res.data.order.id,
        handler: async (response) => {
          try {
            const { data } = await axios.post(
              "https://ecommerce-xi-wheat-32.vercel.app/checkout/paymentverify",
              {
                ...response,
                items: orders,
              },
              {
                headers: {
                  "x-aut-token": `${token}`,
                },
              }
            );
            if (data) {
              setloading(true);
              window.location.href = "/success";
              setloading(false);
            }
          } catch (error) {
            console.log(error);
          }
        },
        prefill: {
          name: "user1", //your customer's name
          email: "user1@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3b83f7",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    handleorderdata();
  }, [orders]);

  return (
    <div>
      {loading === true ? (
        <div className="text-center text-xl">
          Your payment is processing please be patient while we give the
          delivery date
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-6">
            <h2 className="text-2xl text-center">Orderd items</h2>
            <div className="col-start-1 col-end-6">
              <OrderItems orders={orders} setorders={setorders} />
            </div>
          </div>
          {orders.length !== 0 && (
            <>
              <div className="font-medium text-xl text-center">
                Total Payable: &nbsp; &nbsp; &nbsp;
                {priceformat(totalamount)}
              </div>
              <div
                className="mt-5 flex justify-center"
                onClick={() => handlecheckout(totalamount)}
              >
                <button className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-md">
                  Checkout
                </button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

const OrderItems = ({ orders, setorders }) => {
  const [amount, setamount] = useState();
  const setincrement = (amount) => {
    console.log(amount);
    amount < 5 ? setamount(amount + 1) : setamount(5);
  };
  const setdecrement = (amount) => {
    amount > 1 ? setamount(amount - 1) : setamount(1);
  };

  if (orders.length === 0) {
    return <h1>Your Checkout has no items!</h1>;
  }

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `https://ecommerce-xi-wheat-32.vercel.app/cart/${id}`,
        {
          headers: {
            "x-aut-token": localStorage.getItem("token"),
          },
        }
      );
      if (res) {
        toast.success("Item removed!");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="lg:m-5 p-5">
      <div className="">
        {orders.length === 0 ? (
          <div className="grid grid-cols-1">
            <div className="p-20 w-auto"></div>
          </div>
        ) : (
          orders.map((item) => {
            return (
              <div key={item._id}>
                <div className="mb-10 p-1 overflow-auto">
                  <div className="gap-5 lg:gap-[30px] flex  items-center">
                    <img
                      src={item.image}
                      alt="product"
                      className="h-[100px] w-[150px] object-contain"
                    />
                    <p className="font-sans font-thin text-ellipsis">
                      {item.name}
                    </p>
                  </div>
                </div>
                <div className="flex m-4 gap-4 lg:gap-[90px] ">
                  <div className="">
                    <CountToggle
                      amount={item.quantity}
                      setincrement={() => setincrement(item.quantity)}
                      setdecrement={() => setdecrement(item.quantity)}
                    />
                  </div>
                  <span className="font-medium">{priceformat(item.price)}</span>
                  <span
                    className="bg-slate-100 hover:cursor-pointer"
                    onClick={() => handleDelete(item.productId)}
                  >
                    🗑️
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Payment;
