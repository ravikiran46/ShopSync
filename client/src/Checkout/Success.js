import React from "react";
import Home from "../components/Home";
import { Link } from "react-router-dom";

const Success = () => {
  // const searchParams = useSearchParams()[0];
  // const reference = searchParams.get("reference");
  const date = new Date();
  return (
    <Home>
      <p className="text-center text-2xl font-semibold mt-32 text-nowrap">
        Order Successful!
        <span>&#9989;</span>
        <br />
        <span className="text-wrap text-xl font-normal">
          {/* Referece No : <span>{reference}</span> */}
          <span>
            Your Order will be Delivered at
            <br />
            <span className="text-xl font-semibold">
              {date.getDate() + 2}th May 12:00 PM
            </span>
          </span>
        </span>
      </p>
      <p className="font-medium text-wrap p-4 text-center">
        An email has been sent to regarding the order details
        <p className="font-normal">
          Here is the quick access to your orders. &nbsp;
          <Link to="/myorders" className="underline">
            My Orders
          </Link>
        </p>
      </p>
    </Home>
  );
};

export default Success;
