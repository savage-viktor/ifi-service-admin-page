import { createAction } from "@reduxjs/toolkit";

export const login = createAction("login/login");
export const logout = createAction("login/logout");

// export const login = (value) => {
//   return {
//     type: "login/login",
//     payload: value,
//   };
// };

// export const logout = (value) => {
//   return {
//     type: "login/logout",
//     payload: value,
//   };
// };
