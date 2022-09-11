import React, { useEffect, useMemo } from "react";
import { FilterForm } from "../components/FilterForm";
import { SalesTable } from "../components/SalesTable";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";
import {
  FilterParams,
  getSalesAsync,
  setSalesDetail,
} from "../store/sales-reducer/salesReducer";

export const SalesTablePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { salesRows, filterParams } = useAppSelector(
    (state: RootState) => state.sales
  );

  const columns = useMemo(
    () => [
      {
        Header: "sales id",
        accessor: "sales_id",
        Cell: ({ value }: any) => (
          <p
            className="cursor-pointer"
            onClick={() => {
              dispatch(setSalesDetail(value));
              navigate(`/sales-detail/${value}`);
            }}
          >
            {value}
          </p>
        ),
      },
      {
        Header: "date of purchase",
        accessor: "date_of_purchase",
      },
      {
        Header: "customer id",
        accessor: "customer_id",
      },
      {
        Header: "fuel",
        accessor: "fuel",
      },
      {
        Header: "premium",
        accessor: "premium",
      },
      {
        Header: "vehicle segment",
        accessor: "vehicle_segment",
      },
      {
        Header: "selling price",
        accessor: "selling_price",
      },
      {
        Header: "power steering",
        accessor: "power_steering",
      },
      {
        Header: "airbags",
        accessor: "airbags",
      },
      {
        Header: "matt finish",
        accessor: "matt_finish",
      },
      {
        Header: "music system",
        accessor: "music_system",
      },
      {
        Header: "customer gender",
        accessor: "customer_gender",
      },
      {
        Header: "customer income group",
        accessor: "customer_income_group",
      },
      {
        Header: "customer region",
        accessor: "customer_region",
      },
      {
        Header: "customer marital status",
        accessor: "customer_marital_status",
      },
    ],
    [dispatch, navigate]
  );

  const onSubmit = () => {
    dispatch(getSalesAsync(filterParams!));
  };

  useEffect(() => {
    dispatch(getSalesAsync({ pageNumber: 0, pageSize: 25 } as FilterParams));
  }, [dispatch]);

  return (
    <div className="shadow-md sm:rounded-lg">
      <p className="text-2xl px-3 pb-3 font-semibold">{"Car Sales Table"}</p>
      <FilterForm onSubmit={onSubmit} />
      <SalesTable columns={columns} data={salesRows} />
    </div>
  );
};
