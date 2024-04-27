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
    watch,
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
            required: true,
            maxLength: 20,
            pattern: /[a-zA-Z]+/,
            //   placeholder={`${isEdit.edit} ? ${isEdit.pieData.name} : ""`}
          })}
        />
        {errors.pieName && (
          <span>Please provide a name for the pie using letters only</span>
        )}
      </label>

      <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
        Whole price
        <input
          type="number"
          className="grow"
          {...register("wholePrice", { required: true, maxLength: 4 })}
        />
        {errors.wholePrice && <span>Please provide a price for the pie</span>}
      </label>

      <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
        Slice price
        <input
          type="number"
          className="grow"
          {...register("slicePrice", {
            required: true,
            maxLength: 4,
          })}
        />
        {errors.wholePrice && (
          <span>Please provide a slice price for the pie</span>
        )}
      </label>

      <label className="input input-bordered flex items-center gap-2 w-full text-gray-200 mt-2">
        Slice calories
        <input
          type="number"
          className="grow"
          {...register("sliceCalories", {
            required: true,
            maxLength: 4,
          })}
        />
        {errors.sliceCalories && (
          <span>Please provide the calories for the pie</span>
        )}
      </label>

      <input type="submit" />
    </form>
  );
}
