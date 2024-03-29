import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

import styles from "./index.module.css";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter basename="/admin.html">
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
