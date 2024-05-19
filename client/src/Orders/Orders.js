import React from "react";
import Page from "./Page";
import Home from "../components/Home";
import Container from "../components/Container";
import Loading from "./loading";
const Orders = () => {
  return (
    <div>
      <Home>
        <div className="bg-zinc-100">
          <Container>
            <Page />
            <Loading />
          </Container>
        </div>
      </Home>
    </div>
  );
};

export default Orders;
