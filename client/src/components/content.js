import React, { useContext } from "react";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { ProductContext } from "../Context/Context";
import Home from "./Home";
import Loading1 from "./Loading1";
const Content = () => {
  const data = useContext(ProductContext);
  // const data = [];
  return (
    <Home>
      <Container>
        {data.length !== 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-2">
            {data.map((items) => {
              return <ProductCard data={items} key={items.id} />;
            })}
          </div>
        ) : (
          <Loading1 />
        )}
      </Container>
    </Home>
  );
};

export default Content;
