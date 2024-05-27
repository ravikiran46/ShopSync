import React, { useContext } from "react";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { ProductContext } from "../Context/Context";
import Home from "./Home";
import Loading1 from "./Loading1";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
const Content = () => {
  const data = useContext(ProductContext);
  // const data = [];
  const [searchTerm, setsearchTerm] = useState("");

  return (
    <Home>
      <Container>
        <div className="mt-2 flex rounded p-3 shadow-sm bg-white gap-5 border-[1px] mb-3 focus-within:shadow-md">
          <FaSearch size={25} style={{ color: "#2196f3" }} />{" "}
          <input
            id="searchinput"
            type="text"
            placeholder="Search items.."
            className="w-full bg-transparent border-none focus: outline-none"
            onChange={(event) => {
              setsearchTerm(event.target.value);
            }}
          />{" "}
        </div>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-2">
          {" "}
          {data
            .filter((val) => {
              if (searchTerm == "") {
                return val;
              } else if (
                val.name.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                return val;
              }
            })
            .map((val) => {
              return <ProductCard data={val} key={val.id} />;
            })}
        </div>
        <div></div>
        {data.length !== 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8 mt-2"></div>
        ) : (
          <Loading1 />
        )}{" "}
      </Container>{" "}
    </Home>
  );
};

export default Content;
