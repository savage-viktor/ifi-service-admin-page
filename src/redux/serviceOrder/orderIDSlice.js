import { createSlice } from "@reduxjs/toolkit";

export const orderIDInitialState = 0;

const orderIDSlice = createSlice({
  name: "serviceOrder/orderID",
  initialState: orderIDInitialState,
  reducers: {
    setOrderID(state, action) {
      return action.payload;
    },
  },
});

export const { setOrderID } = orderIDSlice.actions;
export const orderIDReducer = orderIDSlice.reducer;
