import React, { useState } from "react";
import ShippingInfo from "./ShippingInfo";
import Payment from "./Payment";

const Steps = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      label: "Delivery Address",
      content: <ShippingInfo />,
    },
    {
      label: "Payment",
      content: <Payment />,
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
export default Steps;
