import React from "react";
import eg from "../assets/eg.jpg";
import eg1 from "../assets/eg1.jpg";
const Banner = () => {
  const stylebgimg = [eg1, eg];
  return (
    <div>
      {/* <div className="flex justify-center overflow-hidden  m-auto rounded-lg relative w-full">
        <img
          src={stylebgimg[1]}
          className="w-[1050px] rounded-xl bg-center bg-cover shadow-lg duration-500 lg:h-[450px]"
          alt="carousel"
        />
      </div> */}
    </div>
  );
};

export default Banner;
