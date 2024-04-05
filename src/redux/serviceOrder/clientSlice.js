import { createSlice } from "@reduxjs/toolkit";

export const clientInitialState = {
  city: "",
  clientType: "regular",
  dropshipper: null,
  isDropshipper: false,
  firstName: "",
  lastName: "",
  phone: "",
};

const clientSlice = createSlice({
  name: "serviceOrder/client",
  initialState: clientInitialState,
  reducers: {
    setInput(state, action) {
      state[action.payload.name] = action.payload.value;
    },

    checkDropshipper(state, action) {
      state.dropshipper = null;
      state.isDropshipper = action.payload;
    },

    changeClientType(state, action) {
      state.city = "";
      state.clientType = "";
      state.dropshipper = null;
      state.isDropshipper = false;
      state.firstName = "";
      state.lastName = "";
      state.phone = "";
      state.clientType = action.payload;
    },

    setRegularClient(state, action) {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.city = action.payload.city;
      state.phone = action.payload.phone;
    },

    clearRegularClient(state, action) {
      state.city = "";
      state.firstName = "";
      state.lastName = "";
      state.phone = "";
    },

    setDropshipper(state, action) {
      state.dropshipper = action.payload;
    },

    clearDropshipper(state, action) {
      state.dropshipper = null;
    },
  },
});

export const {
  setInput,
  checkDropshipper,
  changeClientType,
  setRegularClient,
  clearRegularClient,
  setDropshipper,
  clearDropshipper,
} = clientSlice.actions;
export const clientReducer = clientSlice.reducer;
