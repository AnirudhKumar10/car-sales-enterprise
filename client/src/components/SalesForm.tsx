import { ChangeEventHandler, useState } from "react";
import { SalesDetail } from "../store/sales-reducer/salesReducer";
import CheckBox from "./CheckBox";
import { Input } from "./Input";
import { Select } from "./Select";

export interface SalesFormProps<T extends SalesDetail> {
  state: T;
  onFormSubmit?: Function;
  getState?: (state: T) => void;
  isEdit?: boolean;
}

export const SalesForm = <T extends SalesDetail>({
  state,
  onFormSubmit,
  getState,
  isEdit = false,
}: SalesFormProps<T>) => {
  const [formState, setFormState] = useState<T>(state);

  const inputChangeHandler = (state: any) => {
    setFormState({
      ...formState,
      [state.target.name]: state.target.value,
    });
  };

  const checkbpxChangeHandler = (state: any) => {
    setFormState({
      ...formState,
      [state.target.name]: state.target.checked ? "1" : "0",
    });
  };

  return (
    <form onSubmit={onFormSubmit as ChangeEventHandler<HTMLFormElement>}>
      <div className="grid lg:grid-cols-3 grid-cols-1">
        <Input
          disabled={isEdit}
          type="text"
          label="Sale Id"
          name="sales_id"
          onChange={inputChangeHandler}
        />
        <Input
          type="text"
          label="Customer Id"
          name="customer_id"
          onChange={inputChangeHandler}
        />
        <Input
          disabled={isEdit}
          type="date"
          label="Date of purchase"
          name="date_of_purchase"
          onChange={inputChangeHandler}
        />
        <Select
          onChange={inputChangeHandler}
          label="Fuel"
          name={"fuel"}
          options={[
            { label: "CNG", value: "CNG" },
            { label: "Petrol", value: "Petrol" },
            { label: "Diesel", value: "Diesel" },
          ]}
        />
        <Select
          onChange={inputChangeHandler}
          label="Vehicle Segment"
          name={"vehicle_segment"}
          options={[
            { label: "A", value: "A" },
            { label: "B", value: "B" },
            { label: "C", value: "C" },
          ]}
        />
        <Select
          onChange={inputChangeHandler}
          label="Customer Income Group"
          name={"customer_income_group"}
          options={[
            { label: "0-$25K", value: "0-$25K" },
            { label: "$25-$70K", value: "$25-$70K" },
            { label: ">$70K", value: ">$70K" },
          ]}
        />
        <Select
          onChange={inputChangeHandler}
          label="Customer Region"
          name={"customer_region"}
          options={[
            { label: "North", value: "North" },
            { label: "South", value: "South" },
            { label: "West", value: "West" },
            { label: "East", value: "East" },
          ]}
        />
        <Select
          onChange={inputChangeHandler}
          label="Customer Gender"
          name={"customer_gender"}
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
        <Input
          type="text"
          label="Selling Price"
          name="selling_price"
          onChange={inputChangeHandler}
        />
        <Input
          type="text"
          label="Premium"
          name="premium"
          onChange={inputChangeHandler}
        />
      </div>
      <div className="p-3">
        <h5>
          <b>Check if the following is true:</b>
        </h5>
      </div>
      <div className="flex flex-col md:flex-row justify-between">
        <CheckBox
          label="Power Steering"
          name={"power_steering"}
          onChange={checkbpxChangeHandler}
        />
        <CheckBox
          label="Airbags"
          name={"airbags"}
          onChange={checkbpxChangeHandler}
        />
        <CheckBox
          label="Sunroof"
          name={"sunroof"}
          onChange={checkbpxChangeHandler}
        />
        <CheckBox
          label="Matt Finish"
          name={"matt_finish"}
          onChange={checkbpxChangeHandler}
        />
        <CheckBox
          label="Music System"
          name={"music_system"}
          onChange={checkbpxChangeHandler}
        />
        <CheckBox
          label="Married ?"
          name={"customer_marital_status"}
          onChange={checkbpxChangeHandler}
        />
      </div>
      <div className="p-3">
        <button
          type="submit"
          onClick={() => {
            getState?.(formState);
          }}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
