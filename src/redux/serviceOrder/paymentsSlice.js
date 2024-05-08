import { createSlice } from "@reduxjs/toolkit";

export const paymentsInitialState = [];

const paymentsSlice = createSlice({
  name: "serviceOrder/payments",
  initialState: paymentsInitialState,
  reducers: {
    addPayment(state, action) {
      state.push(action.payload);
    },
    deletePayment(state, action) {
      state.splice(action.payload, 1);
    },
  },
});

export const { addPayment, deletePayment } = paymentsSlice.actions;
export const paymentsReducer = paymentsSlice.reducer;
