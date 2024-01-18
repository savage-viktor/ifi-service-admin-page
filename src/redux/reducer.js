import { createReducer } from "@reduxjs/toolkit";

import { login, logout } from "./login/actions";

const initialState = {
  login: false,
};

// export const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "login/login": {
//   return {
//     ...state,
//     login: true,
//   };
//     }
//     case "login/logout": {
//       return {
//         ...state,
//         login: false,
//       };
//     }
//     default:
//       return state;
//   }
// };

export const rootReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(login, (state, action) => {
      return {
        ...state,
        login: true,
      };
    })
    .addCase(logout, (state, action) => {
      return {
        ...state,
        login: false,
      };
    });
});
