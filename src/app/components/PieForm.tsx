"use client";

import React from "react";
import editPie from "../types/editPie";
import createPie from "../api/post";
import updatePie from "../api/patch";

interface PieFormProps {
  isEdit: editPie;
  setIsEdit: React.Dispatch<React.SetStateAction<editPie>>;
  isFetching: boolean;
}

const PieForm: React.FC<PieFormProps> = ({ isEdit, setIsEdit, isFetching }) => {
  return (
    <div>
      <h2 className="text-center py-4 bg-secondary rounded-t-lg font-bold">
        {isEdit.edit ? `Edit ${isEdit.pieData.name} Pie` : "Create New Pie"}
      </h2>
      <form
        className="flex flex-col max-w-sm h-fit bg-secondary p-4 rounded-b-lg"
        id="create-pie-form"
      >
        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200">
          Pie name
          <input
            type="text"
            className="grow"
            placeholder={isEdit.edit ? isEdit.pieData.name : ""}
            id="pie-name"
            pattern="[a-zA-Z]+"
            required={isEdit.edit ? false : true}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200">
          Whole price
          <input
            type="number"
            placeholder={
              isEdit.edit ? isEdit.pieData.wholePrice.toString() : ""
            }
            id="whole-price"
            required={isEdit.edit ? false : true}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200">
          Slice price
          <input
            type="number"
            placeholder={
              isEdit.edit ? isEdit.pieData.slicePrice.toString() : ""
            }
            id="slice-price"
            required={isEdit.edit ? false : true}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200">
          Slice calories
          <input
            type="number"
            placeholder={
              isEdit.edit ? isEdit.pieData.sliceCalories.toString() : ""
            }
            id="slice-calories"
            required={isEdit.edit ? false : true}
          />
        </label>
        <button
          className="btn btn-primary btn-md w-full mt-2"
          type="submit"
          disabled={isFetching ? true : false}
          onClick={() =>
            isEdit.edit
              ? updatePie(
                  isEdit.pieData.id,
                  (document.getElementById("pie-name") as HTMLInputElement)
                    .value.length > 0
                    ? (document.getElementById("pie-name") as HTMLInputElement)
                        .value
                    : isEdit.pieData.name,

                  parseInt(
                    (document.getElementById("whole-price") as HTMLInputElement)
                      .value
                  ).valueOf() > 0
                    ? parseInt(
                        (
                          document.getElementById(
                            "whole-price"
                          ) as HTMLInputElement
                        ).value
                      )
                    : isEdit.pieData.wholePrice,

                  parseInt(
                    (document.getElementById("slice-price") as HTMLInputElement)
                      .value
                  ).valueOf() > 0
                    ? parseInt(
                        (
                          document.getElementById(
                            "slice-price"
                          ) as HTMLInputElement
                        ).value
                      )
                    : isEdit.pieData.slicePrice,

                  parseInt(
                    (
                      document.getElementById(
                        "slice-calories"
                      ) as HTMLInputElement
                    ).value
                  ).valueOf() > 0
                    ? parseInt(
                        (
                          document.getElementById(
                            "slice-calories"
                          ) as HTMLInputElement
                        ).value
                      )
                    : isEdit.pieData.sliceCalories
                )
              : createPie(
                  (document.getElementById("pie-name") as HTMLInputElement)
                    .value,
                  parseInt(
                    (document.getElementById("whole-price") as HTMLInputElement)
                      .value
                  ),
                  parseInt(
                    (document.getElementById("slice-price") as HTMLInputElement)
                      .value
                  ),
                  parseInt(
                    (
                      document.getElementById(
                        "slice-calories"
                      ) as HTMLInputElement
                    ).value
                  )
                )
          }
        >
          {isEdit.edit ? "Update Pie" : "Add New Pie"}
        </button>
        {isEdit.edit ? (
          <>
            <div className="flex flex-col w-full border-opacity-50">
              <div className="divider text-sm divider-success">OR</div>
              <button
                onClick={() =>
                  setIsEdit({
                    edit: false,
                    pieData: isEdit.pieData,
                  })
                }
                className="btn btn-md w-full mt-2"
              >
                Create New Pie
              </button>
            </div>
          </>
        ) : null}
      </form>
    </div>
  );
};

export default PieForm;
