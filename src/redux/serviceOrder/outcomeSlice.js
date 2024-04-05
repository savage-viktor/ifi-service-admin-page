import { createSlice } from "@reduxjs/toolkit";

export const outcomeInitialState = {
  logisticType: "remote",
  invoiceNumber: "",
  invoicePrice: "",
  comment: "",
  date: undefined,
};

const outcomeSlice = createSlice({
  name: "serviceOrder/outcome",
  initialState: outcomeInitialState,
  reducers: {
    setOutcome(state, action) {
      state.invoiceNumber = action.payload.invoiceNumber;
      state.invoicePrice = action.payload.invoicePrice;
      state.comment = action.payload.comment;
      state.date = action.payload.date;

      state.logisticType = action.payload.logisticType;
    },
    setRemoteType(state, action) {
      state.logisticType = "remote";
    },
  },
});

export const { setOutcome, setRemoteType } = outcomeSlice.actions;
export const outcomeReducer = outcomeSlice.reducer;
