import React from "react";
import { useAppSelector } from "../store/hooks";
import { SalesDetail as SD } from "../store/sales-reducer/salesReducer";
import { RootState } from "../store/store";

export interface SalesDetailProps {
  salesKey: keyof SD;
  label: string;
}

export const SalesDetail: React.FC<{ sales: Array<SalesDetailProps> }> = ({
  sales,
}) => {
  const { salesDetail } = useAppSelector((state: RootState) => state.sales);
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1">
      {sales.map(({ salesKey, label }) => {
        return (
          <div className="p-3">
            <>
              <b className="p-1.5 capitalize">{label}</b>
              {": "}
              {salesDetail && salesDetail[salesKey]}
            </>
          </div>
        );
      })}
    </div>
  );
};
