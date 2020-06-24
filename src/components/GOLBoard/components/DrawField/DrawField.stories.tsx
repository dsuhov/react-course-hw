import React from "react";
import { DrawField } from "./DrawField";
export default {
  title: "Draw Field",
};

import { Provider } from "react-redux";
import { store } from "@/rdx/store";

export const fiel = () => (
  <Provider store={store}>
    <DrawField />
  </Provider>
);
