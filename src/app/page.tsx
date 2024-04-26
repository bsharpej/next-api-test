"use client";

import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { APIResponseModel } from "./api/types/APIResponseModel";
import fetchAllPies from "./api/get";
import deletePie from "./api/delete";
import Pie from "./types/Pie";
import editPie from "./types/editPie";
import LoadingAnimation from "./components/LoadingAnimation";
import ErrorMessage from "./components/ErrorMessage";
import ToastMessage from "./components/ToastMessage";
import SearchBar from "./components/SearchBar";
import PieCard from "./components/PieCard";
import PieForm from "./components/PieForm";
import HelperMessage from "./components/HelperMessage";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [toastLive, setToastLive] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<editPie>({
    edit: false,
    pieData: {
      id: 0,
      name: "",
      wholePrice: 0,
      slicePrice: 0,
      sliceCalories: 0,
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: number) => {
      return deletePie(id);
    },
  });

  const {
    data: pieData,
    isLoading,
    isError,
    isFetching,
  } = useQuery<APIResponseModel<Pie[]>>({
    queryKey: ["pie-data", deleteMutation, searchTerm],
    queryFn: () => fetchAllPies(searchTerm),
  });

  if (isLoading) return <LoadingAnimation />;

  if (isError) return <ErrorMessage errorMessage={pieData?.message} />;

  if (!pieData)
    return (
      <ErrorMessage errorMessage="Sorry, there was an error fetching the pies" />
    );

  return (
    <main className="flex flex-col items-center justify-center text-xl text-white min-h-[100vh] p-12 max-w-screen-xl mx-auto">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {deleteMutation.isSuccess && (
        <ToastMessage toastLive={toastLive} setToastLive={setToastLive} />
      )}

      <div className="grid grid-flow-col grid-cols-max gap-20">
        <PieForm
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isFetching={isFetching}
        />

        <ul className="grid grid-cols-3 grid-rows-[max-content] h-fit gap-4 text-left text-white list-none">
          {pieData.data.length > 0 ? (
            pieData.data.map((pie: Pie) => {
              return (
                <PieCard
                  key={pie.id}
                  pie={pie}
                  setIsEdit={setIsEdit}
                  deleteMutation={deleteMutation}
                  setToastLive={setToastLive}
                />
              );
            })
          ) : (
            <li>
              <HelperMessage setSearchTerm={setSearchTerm} />
            </li>
          )}
        </ul>
      </div>
    </main>
  );
}
