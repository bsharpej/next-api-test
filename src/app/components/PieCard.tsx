"use client";

import React from "react";
import Pie from "../types/Pie";
import EditPie from "../types/EditPie";
import deletePie from "../api/delete";

interface PieCardProps {
  pie: Pie;
  setIsEdit: React.Dispatch<React.SetStateAction<EditPie>>;
  dataUpdate: () => void;
}

const PieCard: React.FC<PieCardProps> = ({ pie, setIsEdit, dataUpdate }) => {
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
              return deletePie(pie.id), dataUpdate();
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
