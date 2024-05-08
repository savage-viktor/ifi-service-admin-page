import { combineReducers } from "redux";
import { clientReducer } from "./clientSlice";
import { incomeReducer } from "./incomeSlice";
import { outcomeReducer } from "./outcomeSlice";
import { paymentsReducer } from "./paymentsSlice";
import { devicesReducer } from "./devicesSlice";

export const serviceOrderReducer = combineReducers({
  client: clientReducer,
  income: incomeReducer,
  outcome: outcomeReducer,
  payments: paymentsReducer,
  devices: devicesReducer,
});
