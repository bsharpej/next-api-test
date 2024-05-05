"use client";

import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { APIResponseModel } from "./api/types/APIResponseModel";
import fetchAllPies from "./api/get";
import Pie from "./types/Pie";
import editPie from "./types/EditPie";
import LoadingAnimation from "./components/LoadingAnimation";
import ErrorMessage from "./components/ErrorMessage";
import SortAndSearch from "./components/SortAndSearch";
import PieCard from "./components/PieCard";
import PieForm from "./components/PieForm";
import HelperMessage from "./components/HelperMessage";
import ToastMessage from "./components/ToastMessage";

export default function Home() {
  const queryClinet = useQueryClient();

  const [sortAndSearchState, setSortAndSearchState] = useState<{
    searchTerm: string;
    sortBy: "newest" | "oldest";
  }>({
    searchTerm: "",
    sortBy: "newest",
  });

  const [isEdit, setIsEdit] = useState<editPie>({
    edit: false,
    pieData: {
      id: 0,
      name: "",
      wholePrice: 0,
      slicePrice: 0,
      sliceCalories: 0,
      dateTimeCreated: new Date(),
    },
  });

  const pieDataUpdate = useMutation({
    mutationFn: () => fetchAllPies(sortAndSearchState.searchTerm),
    onSuccess: () => queryClinet.invalidateQueries({ queryKey: ["pie-data"] }),
  });

  const {
    data: pieData,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<APIResponseModel<Pie[]>>({
    queryKey: ["pie-data", sortAndSearchState],
    queryFn: () => fetchAllPies(sortAndSearchState.searchTerm),
  });

  if (isLoading) return <LoadingAnimation />;

  if (!pieData) return <ErrorMessage errorMessage={error?.message} />;
  if (isError) return <ErrorMessage errorMessage={pieData?.message} />;

  return (
    <main className="flex flex-col items-center justify-center text-xl text-white min-h-[100vh] p-12 max-w-screen-xl mx-auto">
      <SortAndSearch
        sortAndSearchState={sortAndSearchState}
        setSortAndSearchState={setSortAndSearchState}
      />

      {pieDataUpdate.status === "success" ? (
        <ToastMessage toastMessage="Pies updated!" />
      ) : null}

      <div className="grid grid-flow-col grid-cols-max gap-20">
        <PieForm
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isFetching={isFetching}
          dataUpdate={pieDataUpdate.mutate}
        />

        <ul className="grid grid-cols-3 grid-rows-[max-content] h-fit gap-4 text-left text-white list-none">
          {pieData.data.length > 0 ? (
            pieData.data
              .sort((a: Pie, b: Pie) => {
                return sortAndSearchState.sortBy === "newest"
                  ? new Date(b.dateTimeCreated).getTime() -
                      new Date(a.dateTimeCreated).getTime()
                  : new Date(a.dateTimeCreated).getTime() -
                      new Date(b.dateTimeCreated).getTime();
              })
              .map((pie: Pie) => {
                return (
                  <PieCard
                    key={pie.id}
                    pie={pie}
                    setIsEdit={setIsEdit}
                    dataUpdate={pieDataUpdate.mutate}
                  />
                );
              })
          ) : (
            <li>
              <HelperMessage setSortAndSearchState={setSortAndSearchState} />
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
