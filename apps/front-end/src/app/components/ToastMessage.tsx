"use client";

import React, { useEffect, useState } from "react";

interface ToastMessageProps {
  toastMessage: string;
  toastType: "success" | "error";
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  toastMessage,
  toastType,
}) => {
  const [toastLive, setToastLive] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setToastLive(false);
    }, 2000);
  }, []);

  return (
    <div className={`toast toast-top z-10 ${toastLive ? "block" : "fadeOut"}`}>
      <span
        className={`alert ${
          toastType === "success" ? "alert-success" : "alert-error"
        } fade`}
      >
        {toastMessage}
      </span>
    </div>
  );
};

export default ToastMessage;
