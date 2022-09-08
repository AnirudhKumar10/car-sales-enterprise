import React, { useMemo, useState } from "react";
import { SalesDetail, SalesDetailProps } from "../components/SalesDetail";
import { SalesForm } from "../components/SalesForm";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { FiArrowLeft, FiEdit2 } from "react-icons/fi";
import {
  deleteSaleDetailAsync,
  SalesDetail as SD,
  updateSaleDetailAsync,
} from "../store/sales-reducer/salesReducer";
import { Spinner } from "../components/Spinner";
import { useNavigate } from "react-router-dom";

export const SalesDetailPage = () => {
  const [isEditMode, setIsEditmode] = useState(false);

  const { salesDetail, isError, isLoading } = useAppSelector(
    (state: RootState) => state.sales
  );

  const sales = useMemo(
    () => [
      {
        label: "sales id",
        salesKey: "sales_id",
      },
      {
        label: "date of purchase",
        salesKey: "date_of_purchase",
      },
      {
        label: "customer id",
        salesKey: "customer_id",
      },
      {
        label: "fuel",
        salesKey: "fuel",
      },
      {
        label: "premium",
        salesKey: "premium",
      },
      {
        label: "vehicle segment",
        salesKey: "vehicle_segment",
      },
      {
        label: "selling price",
        salesKey: "selling_price",
      },
      {
        label: "power steering",
        salesKey: "power_steering",
      },
      {
        label: "airbags",
        salesKey: "airbags",
      },
      {
        label: "matt finish",
        salesKey: "matt_finish",
      },
      {
        label: "music system",
        salesKey: "music_system",
      },
      {
        label: "customer gender",
        salesKey: "customer_gender",
      },
      {
        label: "customer income group",
        salesKey: "customer_income_group",
      },
      {
        label: "customer region",
        salesKey: "customer_region",
      },
      {
        label: "customer marital status",
        salesKey: "customer_marital_status",
      },
    ],
    []
  );

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="shadow-md sm:rounded-lg border border-2 p-4">
      <div className="flex items-center">
        <div>
          <button
            type="button"
            onClick={() => {
              setIsEditmode((state) => !state);
            }}
            className="px-3 py-2 text-center text-md font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {!isEditMode ? (
              <>
                <FiEdit2 />
              </>
            ) : (
              <>
                <FiArrowLeft />
              </>
            )}
          </button>
        </div>
        <p className="text-2xl px-3 font-semibold">
          {!isEditMode ? "Sales Detail" : "Edit Sales Detail"}
          {isLoading && <Spinner />}
        </p>
        <div className="ml-auto">
          <button
            type="button"
            onClick={() => {
              dispatch(deleteSaleDetailAsync(salesDetail?.sales_id as string));
              navigate("/");
            }}
            className="px-3 py-2 text-center text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="py-4">
        {isEditMode ? (
          <SalesForm
            isEdit
            state={salesDetail as SD}
            onFormSubmit={(e: any) => {
              e.preventDefault();
            }}
            getState={(state) => {
              dispatch(updateSaleDetailAsync(state));
              if (isError) {
                alert("Failed to Create a Sale");
              }
              return;
            }}
          />
        ) : (
          <SalesDetail sales={sales as SalesDetailProps[]} />
        )}
      </div>
    </div>
  );
};
