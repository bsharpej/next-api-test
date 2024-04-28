"use client";

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import createPie from "../api/post";
import updatePie from "../api/patch";
import FormData from "../types/FormData";
import EditPie from "../types/EditPie";

interface PieFormProps {
  isEdit: EditPie;
  setIsEdit: React.Dispatch<React.SetStateAction<EditPie>>;
  isFetching: boolean;
}

const PieForm: React.FC<PieFormProps> = ({ isEdit, setIsEdit, isFetching }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) =>
    isEdit.edit
      ? updatePie(
          data.pieId,
          data.pieName,
          data.wholePrice,
          data.slicePrice,
          data.sliceCalories
        )
      : createPie(
          data.pieName,
          data.wholePrice,
          data.slicePrice,
          data.sliceCalories
        );

  return (
    <div>
      <h2 className="text-center py-4 bg-secondary rounded-t-lg font-bold">
        {isEdit.edit ? `Edit ${isEdit.pieData.name} Pie` : "Create New Pie"}
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
          Pie name
          <input
            type="text"
            placeholder={isEdit.edit ? isEdit.pieData.name : ""}
            className="grow"
            {...register("pieName", {
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
        {errors.pieName && (
          <p className="text-red-300 text-sm text-right">
            {errors.pieName.message}
          </p>
        )}

        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
          Whole price
          <input
            type="number"
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

        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
          Slice price
          <input
            type="number"
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

        <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
          Slice calories
          <input
            type="number"
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
          disabled={isFetching ? true : false}
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
              onClick={() =>
                setIsEdit({
                  edit: false,
                  pieData: isEdit.pieData,
                })
              }
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
