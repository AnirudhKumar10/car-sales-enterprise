import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { FilterParams, setFilters } from "../store/sales-reducer/salesReducer";
import { RootState } from "../store/store";
import { Input } from "./Input";
import { FiPlus } from "react-icons/fi";

export const FilterForm: React.FC<{ onSubmit: Function }> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(
    (state: RootState) => state.sales.filterParams
  );

  const navigate = useNavigate();

  const inputChangeHandler = (state: any) => {
    dispatch(
      setFilters({
        ...filters,
        [state.target.name]: state.target.value,
      } as FilterParams)
    );
  };

  return (
    <div className="flex items-start justify-start border border-2">
      <div className="p-3">
        <button
          onClick={() => {
            navigate("/add-sales-detail");
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FiPlus className="inline" />
          {" New"}
        </button>
      </div>
      <Input
        name="sales_id"
        type="text"
        onChange={inputChangeHandler}
        placeholder={"Sales ID"}
      />
      <Input
        type="text"
        name="customer_id"
        onChange={inputChangeHandler}
        placeholder={"Customer ID"}
      />
      <div className="p-3">
        <button
          onClick={() => onSubmit()}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Search
        </button>
      </div>
    </div>
  );
};
