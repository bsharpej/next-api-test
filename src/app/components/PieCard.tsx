"use client";

import React from "react";
import Pie from "../types/Pie";
import EditPie from "../types/editPie";

interface PieCardProps {
  pie: Pie;
  setIsEdit: React.Dispatch<React.SetStateAction<EditPie>>;
  deletePie: (id: number) => void;
}

const PieCard: React.FC<PieCardProps> = ({ pie, setIsEdit, deletePie }) => {
  return (
    <li className="card bg-secondary w-60 shadow-lg" data-testid={pie.name}>
      <div className="card-body">
        <h3 className="card-title font-bold">{pie.name}</h3>
        <p className="text-base font-light">Whole Price: £{pie.wholePrice}</p>
        <p className="text-base">Slice Price: £{pie.slicePrice}</p>
        <p className="text-base italic">Calories: {pie.sliceCalories}</p>
        <div className="card-actions justify-end mt-4">
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
                  dateTimeCreated: pie.dateTimeCreated,
                },
              })
            }
          >
            Edit
          </button>
          <button
            onClick={() => {
              return deletePie(pie.id);
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
