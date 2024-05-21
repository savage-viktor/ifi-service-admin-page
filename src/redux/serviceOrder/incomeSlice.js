import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

export const incomeInitialState = {
  logisticType: "remote",
  invoiceNumber: "",
  invoicePrice: "",
  comment: "",
  date: dayjs(undefined).format("MM.DD.YYYY"),
};

const incomeSlice = createSlice({
  name: "serviceOrder/income",
  initialState: incomeInitialState,
  reducers: {
    setIncome(state, action) {
      return action.payload;
    },

    setIncomeType(state, action) {
      state.invoiceNumber = "";
      state.invoicePrice = "";

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

export const { setIncome, setRemoteType, setIncomeType, setInput, setDate } =
  incomeSlice.actions;
export const incomeReducer = incomeSlice.reducer;
