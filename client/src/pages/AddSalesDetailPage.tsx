import React from "react";
import { SalesForm } from "../components/SalesForm";
import { Spinner } from "../components/Spinner";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  postSaleDetailAsync,
  SalesDetail,
} from "../store/sales-reducer/salesReducer";
import { RootState } from "../store/store";

export const AddSalesDetailPage: React.FC = () => {
  const { isLoading } = useAppSelector((state: RootState) => state.sales);

  const dispatch = useAppDispatch();

  return (
    <div className="shadow-md sm:rounded-lg border border-2 p-4">
      <p className="text-2xl px-3 font-semibold">
        Add Sales Detail{isLoading && <Spinner />}
      </p>
      <div className="py-3">
        <SalesForm
          state={{} as SalesDetail}
          onFormSubmit={(state) => {
            dispatch(postSaleDetailAsync(state));
          }}
        />
      </div>
    </div>
  );
};
