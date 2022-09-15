import React, { useEffect } from "react";
import { FilterForm } from "../components/FilterForm";
import { SalesTable } from "../components/SalesTable";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import {
  FilterParams,
  getSalesAsync,
  SalesDetail,
  setFilters,
  setSalesDetail,
} from "../store/sales-reducer/salesReducer";
import { createColumnHelper } from "@tanstack/react-table";

export const SalesTablePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { salesRows, filterParams, totalItems, totalPages } = useAppSelector(
    (state: RootState) => state.sales
  );

  const columnHelper = createColumnHelper<SalesDetail>();

  const columns = [
    columnHelper.accessor("sales_id", {
      header: "Sales Id",
      cell: (info) => (
        <p
          className="cursor-pointer"
          onClick={() => {
            dispatch(setSalesDetail(info.getValue()));
            navigate(`/sales-detail/${info.getValue()}`);
          }}
        >
          {info.getValue()}
        </p>
      ),
    }),
    columnHelper.accessor("date_of_purchase", {
      header: "Date Of Purchase",
    }),
    columnHelper.accessor("customer_id", {
      header: "Customer Id",
    }),
    columnHelper.accessor("fuel", {
      header: "Fuel",
    }),
    columnHelper.accessor("premium", {
      header: "Premium",
    }),
    columnHelper.accessor("vehicle_segment", {
      header: "Vehicle Segment",
    }),
    columnHelper.accessor("power_steering", {
      header: "Power Steering",
    }),
    columnHelper.accessor("airbags", {
      header: "Airbags",
    }),
    columnHelper.accessor("sunroof", {
      header: "Sunroof",
    }),
    columnHelper.accessor("matt_finish", {
      header: "Matt Finish",
    }),
    columnHelper.accessor("music_system", {
      header: "Music System",
    }),
    columnHelper.accessor("customer_gender", {
      header: "Customer Gender",
    }),
    columnHelper.accessor("customer_income_group", {
      header: "Customer Income Group",
    }),
    columnHelper.accessor("customer_region", {
      header: "Customer Region",
    }),
    columnHelper.accessor("customer_marital_status", {
      header: "Customer Martial Status",
    }),
  ];

  const onSubmit = () => {
    dispatch(getSalesAsync(filterParams!));
  };

  useEffect(() => {
    dispatch(getSalesAsync({ pageNumber: 1, pageSize: 25 } as FilterParams));
  }, [dispatch]);

  return (
    <div className="shadow-md sm:rounded-lg">
      <p className="text-2xl px-3 pb-3 font-semibold">{"Car Sales Table"}</p>
      <FilterForm onSubmit={onSubmit} />
      <SalesTable
        columns={columns}
        data={salesRows}
        totalItems={totalItems}
        pageSize={filterParams?.pageSize}
        nextPage={() => {
          dispatch(
            setFilters({
              ...filterParams,
              pageNumber:
                filterParams?.pageNumber! < totalPages!
                  ? filterParams?.pageNumber! + 1
                  : totalPages,
            } as FilterParams)
          );
          dispatch(getSalesAsync(filterParams as FilterParams));
        }}
        previousPage={() => {
          dispatch(
            setFilters({
              ...filterParams,
              pageNumber:
                filterParams?.pageNumber! > 1
                  ? filterParams?.pageNumber! - 1
                  : 1,
            } as FilterParams)
          );
          dispatch(getSalesAsync(filterParams as FilterParams));
        }}
        onPageSizeChange={(e) => {
          dispatch(
            setFilters({
              ...filterParams,
              pageSize: Number(e.target.value),
              pageNumber: 0,
            } as FilterParams)
          );
        }}
      />
    </div>
  );
};
