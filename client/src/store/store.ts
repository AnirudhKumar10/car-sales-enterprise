import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import salesReducer from "./sales-reducer/salesReducer";

export const store = configureStore({
  reducer: {
    sales: salesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
