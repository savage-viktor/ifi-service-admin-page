import { combineReducers } from "redux";
import { clientReducer } from "./clientSlice";
import { incomeReducer } from "./incomeSlice";
import { outcomeReducer } from "./outcomeSlice";
import { paymentsReducer } from "./paymentsSlice";
import { devicesReducer } from "./devicesSlice";
import { orderNumberReducer } from "./orderNumberSlice";
import { orderIDReducer } from "./orderIDSlice";

export const serviceOrderReducer = combineReducers({
  _id: orderIDReducer,
  orderNumber: orderNumberReducer,
  client: clientReducer,
  income: incomeReducer,
  outcome: outcomeReducer,
  payments: paymentsReducer,
  devices: devicesReducer,
});
