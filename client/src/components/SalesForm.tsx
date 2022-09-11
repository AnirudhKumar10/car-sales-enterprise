import { useFormik } from "formik";
import { useCallback } from "react";
import { SalesDetail } from "../store/sales-reducer/salesReducer";
import CheckBox from "./CheckBox";
import { Input } from "./Input";
import { Select } from "./Select";

export interface SalesFormProps<T extends SalesDetail> {
  state: T;
  onFormSubmit?: (state: T) => void;
  isEdit?: boolean;
}

export const SalesForm = <T extends SalesDetail>({
  state,
  onFormSubmit,
  isEdit = false,
}: SalesFormProps<T>) => {
  const formik = useFormik<T>({
    initialValues: {
      ...state,
    },
    onSubmit: (values) => {
      onFormSubmit?.(values);
    },
  });

  const formatStringToDate = useCallback((date: string) => {
    if (date) {
      const [mm, dd, yy] = date.split("/");
      return `${yy}-${mm}-${dd}`;
    }

    const d = new Date();
    const yy = d.getFullYear();
    const mm = ("0" + (d.getMonth() + 1)).slice(-2);
    const dd = ("0" + d.getDate()).slice(-2);
    return `${yy}-${mm}-${dd}`;
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid lg:grid-cols-3 grid-cols-1">
        <Input
          disabled={isEdit}
          type="text"
          label="Sale Id"
          name="sales_id"
          value={formik.values.sales_id}
          onChange={formik.handleChange}
        />
        <Input
          type="text"
          label="Customer Id"
          name="customer_id"
          value={formik.values.customer_id}
          onChange={formik.handleChange}
        />
        <Input
          disabled={isEdit}
          type="date"
          label="Date of purchase"
          name="date_of_purchase"
          value={formatStringToDate(formik.values.date_of_purchase)}
          onChange={(e) => {
            console.log(e.target.value);
          }}
        />
        <Select
          onChange={formik.handleChange}
          label="Fuel"
          name={"fuel"}
          value={formik.values.fuel}
          options={[
            { label: "CNG", value: "CNG" },
            { label: "Petrol", value: "Petrol" },
            { label: "Diesel", value: "Diesel" },
          ]}
        />
        <Select
          onChange={formik.handleChange}
          label="Vehicle Segment"
          name={"vehicle_segment"}
          value={formik.values.vehicle_segment}
          options={[
            { label: "A", value: "A" },
            { label: "B", value: "B" },
            { label: "C", value: "C" },
          ]}
        />
        <Select
          onChange={formik.handleChange}
          label="Customer Income Group"
          name={"customer_income_group"}
          value={formik.values.customer_income_group}
          options={[
            { label: "0-$25K", value: "0-$25K" },
            { label: "$25-$70K", value: "$25-$70K" },
            { label: ">$70K", value: ">$70K" },
          ]}
        />
        <Select
          onChange={formik.handleChange}
          label="Customer Region"
          name={"customer_region"}
          value={formik.values.customer_region}
          options={[
            { label: "North", value: "North" },
            { label: "South", value: "South" },
            { label: "West", value: "West" },
            { label: "East", value: "East" },
          ]}
        />
        <Select
          onChange={formik.handleChange}
          label="Customer Gender"
          name={"customer_gender"}
          value={formik.values.customer_gender}
          options={[
            { label: "Male", value: "Male" },
            { label: "Female", value: "Female" },
          ]}
        />
        <Input
          type="text"
          label="Selling Price"
          name="selling_price"
          value={formik.values.selling_price}
          onChange={formik.handleChange}
        />
        <Input
          type="text"
          label="Premium"
          name="premium"
          value={formik.values.premium}
          onChange={formik.handleChange}
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
          value={formik.values.power_steering}
          onChange={formik.handleChange}
        />
        <CheckBox
          label="Airbags"
          name={"airbags"}
          value={formik.values.airbags}
          onChange={formik.handleChange}
        />
        <CheckBox
          label="Sunroof"
          name={"sunroof"}
          value={formik.values.sunroof}
          onChange={formik.handleChange}
        />
        <CheckBox
          label="Matt Finish"
          name={"matt_finish"}
          value={formik.values.matt_finish}
          onChange={formik.handleChange}
        />
        <CheckBox
          label="Music System"
          name={"music_system"}
          value={formik.values.music_system}
          onChange={formik.handleChange}
        />
        <CheckBox
          label="Married ?"
          name={"customer_marital_status"}
          value={formik.values.customer_marital_status}
          onChange={formik.handleChange}
        />
      </div>
      <div className="p-3">
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </div>
    </form>
  );
};
