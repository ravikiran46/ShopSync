import React, { useState, useEffect } from "react";
import axios from "axios";
import CountToggle from "../components/CountToggle";
import { toast } from "react-hot-toast";

const priceformat = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};
const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [orders, setorders] = useState([]);

  const [totalamount, settotalamount] = useState(0);
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

  useEffect(() => {
    handleorderdata();
  }, [orders]);

  const steps = [
    {
      label: "User Info",
      content: (
        <div>
          <h2 className="text-2xl">Orderd items</h2>
          <div className="grid grid-cols-1 lg:grid-cols-6">
            <div className="col-start-1 col-end-6">
              <OrderItems orders={orders} setorders={setorders} />
            </div>
          </div>
          {orders.length !== 0 && (
            <div className="font-medium text-xl">
              Total Payable: &nbsp; &nbsp; &nbsp;
              {priceformat(totalamount)}
            </div>
          )}
        </div>
      ),
    },
    {
      label: "Delivery Address",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Shipping Info</h2>
          <form>
            <div className="lg:flex gap-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="appearance-none border rounded  py-2 px-3 focus:border-[1px] focus:border-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Mobile number
                </label>
                <input
                  type="tel"
                  className="appearance-none border rounded  py-2 px-3 focus:border-[1px] focus:border-black leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Address
              </label>
              <textarea
                className="appearance-none border rounded 
                 py-2 px-3 focus:border-[1px] focus:border-black leading-tight focus:outline-none focus:shadow-outline lg:w-2/5 h-20"
              />
            </div>
            <div className="lg:flex gap-8">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  City
                </label>
                <input
                  type="text"
                  className="appearance-none border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[1px] focus:border-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  State
                </label>
                <input
                  type="text"
                  className="appearance-none border rounded  py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[1px] focus:border-black"
                />
              </div>
            </div>
          </form>
        </div>
      ),
    },
    {
      label: "Payment",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Payment</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Card Number
              </label>
              <input
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[1px] focus:border-black"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Expiration Date
              </label>
              <input
                type="text"
                className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline focus:border-[1px] focus:border-black"
              />
            </div>
          </form>
        </div>
      ),
    },
    {
      label: "Finish",
      content: (
        <div>
          <h2 className="text-2xl font-bold mb-4">Order Placed Successfully</h2>
          <p>Thank you for your order!</p>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handlestep = (index) => {
    setActiveStep(index);
  };
  return (
    <div>
      <div className="flex gap-3 justify-center">
        {steps.map((step, index) => (
          <div
            key={index}
            className={`w-1/3  p-2   text-center duration-200 hover:cursor-pointer  ${
              activeStep === index ? "bg-gray-400 text-white" : "bg-gray-200"
            }`}
            onClick={() => handlestep(index)}
          >
            {step.label}
          </div>
        ))}
      </div>
      <div className="mt-4">
        {steps[activeStep].content}
        <div className="flex justify-between mt-4">
          {activeStep !== steps.length - 1 && (
            <button
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
              onClick={handleNext}
            >
              Next
            </button>
          )}
        </div>
      </div>
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
              <div>
                <div key={item.productId} className="mb-10 p-1 overflow-auto">
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

export default Steps;
