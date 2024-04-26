"use client";

import React, { useEffect } from "react";

interface ToastMessageProps {
  toastLive: boolean;
  setToastLive: React.Dispatch<React.SetStateAction<boolean>>;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  toastLive,
  setToastLive,
}) => {
  useEffect(() => {
    setTimeout(() => {
      setToastLive(false);
    }, 2000);
  }, [toastLive]);

  return (
    <div className={`toast toast-top z-10 ${toastLive ? "block" : "fadeOut"}`}>
      <span className="alert alert-success fade">Pie deleted!</span>
    </div>
  );
};

export default ToastMessage;
