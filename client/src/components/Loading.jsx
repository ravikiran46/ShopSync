import React from 'react';
import './Loading.css'

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default LoadingPage;
