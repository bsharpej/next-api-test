"use client";

import React from "react";

const LoadingAnimation = () => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-1">
      <p className="text-xl text-white">Loading pies</p>
      <span className="loading loading-dots loading-xs text-white"></span>
    </div>
  );
};

export default LoadingAnimation;
