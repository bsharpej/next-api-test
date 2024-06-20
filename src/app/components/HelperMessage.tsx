"use client";

import React from "react";

interface HelperMessageProps {
  setSortAndSearchState: React.Dispatch<
    React.SetStateAction<{
      searchTerm: string;
      sortBy: "newestCreated" | "oldestCreated";
    }>
  >;
}

const HelperMessage: React.FC<HelperMessageProps> = ({
  setSortAndSearchState,
}) => {
  return (
    <div
      role="alert"
      className="alert shadow-lg flex flex-col items-start min-w-64"
    >
      <div className="flex gap-4 items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div>
          <h3 className="font-bold">Oops!</h3>
          <div className="text-xs">Sorry, no pies here.</div>
        </div>
      </div>
      <button
        className="btn btn-primary btn-sm text-left"
        onClick={() =>
          setSortAndSearchState({ searchTerm: "", sortBy: "newestCreated" })
        }
      >
        Reset search
      </button>
    </div>
  );
};

export default HelperMessage;
