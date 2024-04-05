import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLogin: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialState,
  reducers: {
    login(state, action) {
      state.isLogin = true;
    },

    loguot(state, action) {
      state.isLogin = false;
    },
  },
});

export const { login, loguot } = loginSlice.actions;
export const loginReducer = loginSlice.reducer;
