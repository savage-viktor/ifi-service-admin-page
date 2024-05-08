import { configureStore } from "@reduxjs/toolkit";
import { serviceOrderReducer } from "./serviceOrder/reducer";
import { loginReducer } from "./login/loginSlice";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    serviceOrder: serviceOrderReducer,
  },
});
