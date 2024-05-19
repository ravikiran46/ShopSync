import React, { useState, useEffect } from "react";
import axios from "axios";
import { trimstring } from "../components/ProductCard";

const priceformat = (price) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  }).format(price);
};

const Page = () => {
  const [items, setitems] = useState([]);
  const token = window.localStorage.getItem("token");
  const handleitems = async () => {
    let res = await axios.get(
      "https://ecommerce-xi-wheat-32.vercel.app/orders/",
      {
        headers: {
          "x-aut-token": `${token}`,
        },
      }
    );
    if (res.data.status !== 404) {
      setitems(res.data.res.orders);
    } else {
      setitems([]);
    }
  };

  useEffect(() => {
    handleitems();
  }, []);
  return (
    <div className="container">
      <h1 className="text-2xl font-medium uppercase">My Orders</h1>
      {items.length === 0 && <Page2 />}
      {items
        .slice()
        .reverse()
        .map((i, index) => {
          return (
            <div key={index} className="p-3">
              {i.items.map((it) => {
                return (
                  <div className="sm: overflow-hidden">
                    <div
                      key={it.productId}
                      className="mb-4  p-4 bg-white rounded-md  hover:shadow-md flex  lg:justify-around lg:gap-8 sm: gap-4"
                    >
                      <img
                        src={it.image}
                        alt="name"
                        className="aspect-square h-fit object-contain sm: w-1/4 lg:w-1/12"
                      />

                      <p className="lg:mt-10 text-wrap">
                        {trimstring(it.name)}
                      </p>
                      <span className="mt-10">{priceformat(it.price)}</span>
                      <span className="text-wrap lg:mt-10 overflow-hidden">
                        Your item has been delivered
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
    </div>
  );
};

const Page2 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-medium uppercase">
        Orders are not found 🥲
      </h1>
    </div>
  );
};

export default Page;
