"use client";

import React, { useEffect } from "react";
import { useForm, SubmitHandler, set } from "react-hook-form";
import createPie from "../api/post";
import updatePie from "../api/patch";
import EditPie from "../types/EditPie";
import Pie from "../types/Pie";

interface PieFormProps {
  isEdit: EditPie;
  setIsEdit: React.Dispatch<React.SetStateAction<EditPie>>;
  refetchData: () => void;
  isFetching: boolean;
}

const PieForm: React.FC<PieFormProps> = ({
  isEdit,
  setIsEdit,
  refetchData,
  isFetching,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setFocus,
    formState: { errors },
  } = useForm<Pie>();

  const onSubmit: SubmitHandler<Pie> = (data) =>
    isEdit.edit
      ? (updatePieDataAndRefetchData(data), reset())
      : (createPieAndRefetchData(data), reset());

  const updatePieDataAndRefetchData = (data: Pie) => {
    updatePie(
      isEdit.pieData.id,
      data.name || isEdit.pieData.name,
      data.wholePrice || isEdit.pieData.wholePrice,
      data.slicePrice || isEdit.pieData.slicePrice,
      data.sliceCalories || isEdit.pieData.sliceCalories
    ),
      refetchData(),
      setIsEdit({ edit: false, pieData: isEdit.pieData });
  };

  const createPieAndRefetchData = (data: Pie) => {
    createPie(data.name, data.wholePrice, data.slicePrice, data.sliceCalories),
      refetchData();
  };

  const isDisabled = () => {
    if (!errors) {
      isFetching ? true : false;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (isEdit.edit) {
      setFocus("name");
    }
  });

  return (
    <div>
      <h2 className="text-center py-4 bg-secondary rounded-lg font-bold">
        {isEdit.edit ? `Edit ${isEdit.pieData.name} Pie` : "Create New Pie"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label
          id="name"
          className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2"
        >
          Pie name
          <input
            type="text"
            placeholder={isEdit.edit ? isEdit.pieData.name : ""}
            className="grow"
            autoComplete="off"
            {...register("name", {
              required: {
                value: isEdit.edit ? false : true,
                message: "Pie name is required",
              },
              maxLength: {
                value: 12,
                message: "Maximum length is 12 characters",
              },
              pattern: /[a-zA-Z]+/,
            })}
          />
        </label>
        {errors.name && (
          <p className="text-red-300 text-sm text-right">
            {errors.name.message}
          </p>
        )}

        <label
          id="wholePrice"
          className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2"
        >
          Whole price
          <input
            className="grow"
            placeholder={
              isEdit.edit ? isEdit.pieData.wholePrice.toString() : ""
            }
            {...register("wholePrice", {
              required: {
                value: isEdit.edit ? false : true,
                message: "Whole price is required",
              },
              maxLength: {
                value: 5,
                message: "Maximum length is 5 characters",
              },
              pattern: {
                value: /^(\d+)?([.]?\d{0,2})?$/,
                message: "Please enter a valid price",
              },
            })}
          />
        </label>
        {errors.wholePrice && (
          <p className="text-red-300 text-sm text-right">
            {errors.wholePrice.message}
          </p>
        )}

        <label
          id="slicePrice"
          className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2"
        >
          Slice price
          <input
            className="grow"
            placeholder={
              isEdit.edit ? isEdit.pieData.slicePrice.toString() : ""
            }
            {...register("slicePrice", {
              required: {
                value: isEdit.edit ? false : true,
                message: "Slice price is required",
              },
              maxLength: {
                value: 5,
                message: "Maximum length is 5 characters",
              },
              pattern: {
                value: /^(\d+)?([.]?\d{0,2})?$/,
                message: "Please enter a valid price",
              },
            })}
          />
        </label>
        {errors.slicePrice && (
          <p className="text-red-300 text-sm text-right">
            {errors.slicePrice.message}
          </p>
        )}

        <label
          id="sliceCalories"
          className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2"
        >
          Slice calories
          <input
            className="grow"
            placeholder={
              isEdit.edit ? isEdit.pieData.sliceCalories.toString() : ""
            }
            {...register("sliceCalories", {
              required: {
                value: isEdit.edit ? false : true,
                message: "Slice calories is required",
              },
              maxLength: {
                value: 3,
                message: "Maximum slice calories can be 999",
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "Please enter a valid number",
              },
            })}
          />
        </label>
        {errors.sliceCalories && (
          <p className="text-red-300 text-sm text-right">
            {errors.sliceCalories.message}
          </p>
        )}

        <button
          className="btn btn-primary btn-md w-full mt-2"
          type="submit"
          disabled={isDisabled()}
        >
          {isEdit.edit ? "Update Pie" : "Create Pie"}
        </button>
      </form>

      {isEdit.edit ? (
        <>
          <div className="flex flex-col w-full border-opacity-50">
            <div className="divider text-sm divider-success">OR</div>
            <button
              type="button"
              onClick={() => {
                setIsEdit({
                  edit: false,
                  pieData: isEdit.pieData,
                }),
                  setFocus("name"),
                  reset();
              }}
              className="btn btn-primary btn-md w-full"
            >
              Create New Pie
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default PieForm;
