import { createSlice } from "@reduxjs/toolkit";

export const orderNumberInitialState = 0;

const orderNumberSlice = createSlice({
  name: "serviceOrder/orderNumber",
  initialState: orderNumberInitialState,
  reducers: {
    setOrderNumber(state, action) {
      return action.payload;
    },
  },
});

export const { setOrderNumber } = orderNumberSlice.actions;
export const orderNumberReducer = orderNumberSlice.reducer;
