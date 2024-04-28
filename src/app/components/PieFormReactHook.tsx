import { useForm, SubmitHandler } from "react-hook-form";
import createPie from "../api/post";

type Inputs = {
  pieName: string;
  wholePrice: number;
  slicePrice: number;
  sliceCalories: number;
};

export default function PieFormReactHook() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) =>
    createPie(
      data.pieName,
      data.wholePrice,
      data.slicePrice,
      data.sliceCalories
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
        Pie name
        <input
          type="text"
          className="grow"
          {...register("pieName", {
            required: {
              value: true,
              message: "Pie name is required",
            },
            maxLength: {
              value: 10,
              message: "Maximum length is 10 characters",
            },
            pattern: /[a-zA-Z]+/,
            //   placeholder={`${isEdit.edit} ? ${isEdit.pieData.name} : ""`}
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
          {...register("wholePrice", {
            required: {
              value: true,
              message: "Whole price is required",
            },
            maxLength: {
              value: 4,
              message: "Maximum length is 4 characters",
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
          {...register("slicePrice", {
            required: {
              value: true,
              message: "Slice price is required",
            },
            maxLength: {
              value: 4,
              message: "Maximum length is 4 characters",
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
          {...register("sliceCalories", {
            required: {
              value: true,
              message: "Slice calories is required",
            },
            maxLength: {
              value: 4,
              message: "Maximum length is 4 characters",
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
        // disabled={isFetching ? true : false}
      >
        Create Pie
      </button>
    </form>
  );
}
