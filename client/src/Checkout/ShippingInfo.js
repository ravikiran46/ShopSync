import React from "react";

const ShippingInfo = () => {
  return (
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
  );
};

export default ShippingInfo;
