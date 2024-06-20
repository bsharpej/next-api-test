"use client";

import React from "react";

interface SortAndSearchProps {
  setSortAndSearchState: React.Dispatch<
    React.SetStateAction<{
      searchTerm: string;
      sortBy: "newestCreated" | "oldestCreated";
    }>
  >;
  sortAndSearchState: {
    searchTerm: string;
    sortBy: "newestCreated" | "oldestCreated";
  };
}

const SortAndSearch: React.FC<SortAndSearchProps> = ({
  setSortAndSearchState,
  sortAndSearchState,
}) => {
  return (
    <div className="w-full flex gap-4 items-center mb-4">
      <label className="input input-bordered flex items-center gap-2 w-full">
        <input
          type="text"
          className="grow"
          placeholder="Search"
          value={sortAndSearchState.searchTerm}
          onChange={(e) =>
            setSortAndSearchState({
              searchTerm: e.target.value,
              sortBy: "newestCreated",
            })
          }
          autoFocus
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="w-4 h-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div className="dropdown min-w-fit">
        <div tabIndex={0} role="button" className="btn m-1">
          {sortAndSearchState.sortBy === "newestCreated"
            ? "Newest created"
            : "Oldest created"}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <a
              onClick={() =>
                setSortAndSearchState({
                  searchTerm: sortAndSearchState.searchTerm,
                  sortBy: "newestCreated",
                })
              }
            >
              Newest created
            </a>
          </li>
          <li>
            <a
              onClick={() =>
                setSortAndSearchState({
                  searchTerm: sortAndSearchState.searchTerm,
                  sortBy: "oldestCreated",
                })
              }
            >
              Oldest created
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SortAndSearch;
