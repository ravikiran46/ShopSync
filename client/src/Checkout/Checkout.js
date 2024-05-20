import React from "react";
import Steps from "./Steps";
import Home from "../components/Home";
import Container from "../components/Container";

const Checkout = () => {
  return (
    <div>
      <Home>
        <Container>
          <div className="mt-6 p-5 rounded-sm ">
            <Steps />
          </div>
        </Container>
      </Home>
    </div>
  );
};

export default Checkout;
