import { createSlice } from "@reduxjs/toolkit";

export const incomeInitialState = {
  logisticType: "remote",
  invoiceNumber: "",
  invoicePrice: "",
  comment: "",
  date: undefined,
};

const incomeSlice = createSlice({
  name: "serviceOrder/income",
  initialState: incomeInitialState,
  reducers: {
    setIncome(state, action) {
      state.invoiceNumber = action.payload.invoiceNumber;
      state.invoicePrice = action.payload.invoicePrice;
      state.comment = action.payload.comment;
      state.date = action.payload.date;
      state.logisticType = action.payload.logisticType;
    },
  },
});

export const { setIncome } = incomeSlice.actions;
export const incomeReducer = incomeSlice.reducer;
