"use client";

import React, { useEffect, useState } from "react";

interface ToastMessageProps {
  toastMessage: string;
}

const ToastMessage: React.FC<ToastMessageProps> = ({ toastMessage }) => {
  const [toastLive, setToastLive] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setToastLive(false);
    }, 2000);
  }, []);

  return (
    <div className={`toast toast-top z-10 ${toastLive ? "block" : "fadeOut"}`}>
      <span className="alert alert-success fade">{toastMessage}</span>
    </div>
  );
};

export default ToastMessage;
