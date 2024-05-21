import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const outcomeInitialState = {
  logisticType: "remote",
  invoiceNumber: "",
  invoicePrice: "",
  comment: "",
  date: dayjs(undefined).format("MM.DD.YYYY"),
};

const outcomeSlice = createSlice({
  name: "serviceOrder/outcome",
  initialState: outcomeInitialState,
  reducers: {
    setOutcome(state, action) {
      return action.payload;
    },

    setOutcomeType(state, action) {
      state.invoiceNumber = "";
      state.invoicePrice = "";
      // state.comment = "";
      // state.date = Date.now();

      state.logisticType = action.payload;
    },
    setInput(state, action) {
      state[action.payload.name] = action.payload.value;
    },
    setDate(state, action) {
      state.date = action.payload;
    },
  },
});

export const {
  setOutcome,
  setOutcomeRemote,
  setOutcomeType,
  setInput,
  setDate,
} = outcomeSlice.actions;
export const outcomeReducer = outcomeSlice.reducer;
