import { combineReducers } from "redux";
import { clientReducer } from "./clientSlice";
import { incomeReducer } from "./incomeSlice";
import { outcomeReducer } from "./outcomeSlice";

export const serviceOrderReducer = combineReducers({
  client: clientReducer,
  income: incomeReducer,
  outcome: outcomeReducer,
});

// export const serviceOrderInitialState = {
//   client: "",
//   income: "",
//   outcome: "",
//   pays: "",
//   devices: "",
// };
