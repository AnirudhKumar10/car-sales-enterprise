import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { toast } from "react-toastify";

export type SalesDetail = {
  sales_id: string;
  date_of_purchase: string;
  customer_id: Number;
  fuel: "CNG" | "Petrol" | "Diesel";
  premium: string;
  vehicle_segment: "A" | "B" | "C";
  selling_price: string;
  power_steering: string;
  airbags: string;
  sunroof: string;
  matt_finish: string;
  music_system: string;
  customer_gender: "Male" | "Female";
  customer_income_group: "0-$25K" | "$25-$70K" | ">$70K";
  customer_region: "North" | "South" | "East" | "West";
  customer_marital_status: string;
};

export type FilterParams = {
  pageSize: number;
  pageNumber: number;
  sales_id: string;
  customer_id: string;
};

export interface SalesAppSate {
  salesRows: Array<SalesDetail>;
  salesDetail: SalesDetail | null;
  isLoading?: boolean;
  isError?: boolean;
  filterParams?: FilterParams;
}

export const initialState: SalesAppSate = {
  salesRows: [],
  salesDetail: {
    sales_id: "",
    date_of_purchase: "",
    customer_id: 0,
    fuel: "CNG",
    premium: "",
    vehicle_segment: "A",
    selling_price: "",
    power_steering: "",
    airbags: "",
    sunroof: "",
    matt_finish: "",
    music_system: "",
    customer_gender: "Male",
    customer_income_group: "$25-$70K",
    customer_region: "North",
    customer_marital_status: "",
  },
  filterParams: {
    pageSize: 25,
    pageNumber: 0,
    sales_id: "",
    customer_id: "",
  },
};

const baseUrl = "http://localhost:4000/sale";

export const getSalesAsync = createAsyncThunk(
  "sales/fetchSales",
  async (filterParams: FilterParams, { rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.get(`${baseUrl}/search`, {
        params: filterParams,
      });
      toast.success("Sale Records successfully fetched!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return response.data.salesResponse;
    } catch (err) {
      toast.error("Error fetching sale records", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return rejectWithValue(err);
    }
  }
);

export const postSaleDetailAsync = createAsyncThunk(
  "sales/addSaleDetail",
  async (salesDetail: SalesDetail, { rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.post(`${baseUrl}/add`, {
        ...salesDetail,
      });
      toast.success("Sale Record successfully added!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return response.data;
    } catch (err) {
      toast.error("Error adding the sale record", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return rejectWithValue(err);
    }
  }
);

export const updateSaleDetailAsync = createAsyncThunk(
  "sales/upadteSaleDetail",
  async (salesDetail: SalesDetail, { rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.patch(`${baseUrl}/update`, {
        ...salesDetail,
      });
      toast.success("Sale Record successfully updated!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return response.data;
    } catch (err) {
      toast.error("Error updating the sale record", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return rejectWithValue(err);
    }
  }
);

export const deleteSaleDetailAsync = createAsyncThunk(
  "counter/deleteSaleDetail",
  async (sales_id: string, { rejectWithValue }): Promise<any> => {
    try {
      const response = await axios.delete(`${baseUrl}/delete`, {
        params: sales_id,
      });
      toast.success("Sale Record successfully deleted!", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return response.data;
    } catch (err) {
      toast.error("Error deleting the sale record.", {
        position: toast.POSITION.BOTTOM_RIGHT,
      });
      return rejectWithValue(err);
    }
  }
);

export const salesSlice = createSlice({
  name: "sales",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterParams>) => {
      state.filterParams = action.payload;
    },
    setSalesDetail: (state, action: PayloadAction<string>) => {
      state.salesDetail = state.salesRows.filter(
        (row) => row.sales_id === action.payload
      )[0];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSalesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSalesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.salesRows = action.payload;
      })
      .addCase(getSalesAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(postSaleDetailAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postSaleDetailAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state = { ...state, salesDetail: action.payload };
      })
      .addCase(postSaleDetailAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateSaleDetailAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSaleDetailAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state = { ...state, salesDetail: action.payload };
      })
      .addCase(updateSaleDetailAsync.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteSaleDetailAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteSaleDetailAsync.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteSaleDetailAsync.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const selectCount = (state: RootState) => state.sales;

export const { setFilters, setSalesDetail } = salesSlice.actions;

export default salesSlice.reducer;
