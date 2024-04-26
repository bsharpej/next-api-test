"use client";

import React from "react";
import Pie from "../types/Pie";
import editPie from "../types/editPie";

interface PieCardProps {
  pie: Pie;
  setIsEdit: React.Dispatch<React.SetStateAction<editPie>>;
  setToastLive: React.Dispatch<React.SetStateAction<boolean>>;
  deleteMutation: any;
}

const PieCard: React.FC<PieCardProps> = ({
  pie,
  setIsEdit,
  deleteMutation,
  setToastLive,
}) => {
  return (
    <li className="card bg-secondary w-60 shadow-lg">
      <div className="card-body">
        <h3 className="card-title font-bold">{pie.name}</h3>
        <p className="text-base font-light">Whole Price: £{pie.wholePrice}</p>
        <p className="text-base">Slice Price: £{pie.slicePrice}</p>
        <p className="text-base italic">Calories: {pie.sliceCalories}</p>
        <div className="card-actions justify-end">
          <button
            className="btn btn-xs btn-info"
            onClick={() =>
              setIsEdit({
                edit: true,
                pieData: {
                  id: pie.id,
                  name: pie.name,
                  wholePrice: pie.wholePrice,
                  slicePrice: pie.slicePrice,
                  sliceCalories: pie.sliceCalories,
                },
              })
            }
          >
            Edit
          </button>
          <button
            onClick={() => {
              return deleteMutation.mutate(pie.id), setToastLive(true);
            }}
            className="btn btn-outline btn-xs btn-error"
          >
            Delete
          </button>
        </div>
      </div>
    </li>
  );
};

export default PieCard;
