import React from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { RiAccountCircleLine } from "react-icons/ri";

const Navbar = ({ log }) => {
  const style = {
    bg: "bg-blue-500",
    text: "text-white",
  };
  return (
    <div
      className={
        log
          ? `${style.bg} ${style.text}  top-0 w-full z-30 shadow-sm`
          : "bg-white  top-0 w-full z-30 shadow-sm"
      }
    >
      <nav className="py-3 border-b-[2px]">
        <div className="grid grid-cols-13 items-center">
          <div className="col-start-1 col-end-3 text-center">
            <Link
              to="/"
              className={
                log ? "font-extrabold" : "text-blue-600 font-extrabold"
              }
            >
              ShopSync
            </Link>
          </div>

          <div className="flex items-center gap-4 md:gap-9 col-start-10 col-end-12">
            <div
              className={
                log
                  ? "flex text-center p-2 justify-center items-center min-w-24 h-9 rounded-md hover:text-lg  duration-500"
                  : "flex text-center p-2 justify-center items-center min-w-24 h-9 rounded-md hover:bg-blue-500 hover:text-slate-50"
              }
            >
              {log ? (
                <>
                  <Link to="/account" className="flex item-center gap-2">
                    <RiAccountCircleLine className="block w-6 h-6  lg:hidden" />
                    <span className="hidden font-noraml font-mono lg:inline-block">
                      PROFILE
                    </span>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center gap-2">
                    <RiAccountCircleLine className="w-5 h-5" />
                    Login
                  </Link>
                </>
              )}
            </div>
            <div>
              <Link to="/cart">
                <CiShoppingCart className="h-7 w-7" />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Navbar;
