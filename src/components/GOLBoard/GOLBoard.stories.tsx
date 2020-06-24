import React from "react";
import { GOLBoard } from "./GOLBoard";
export default {
  title: "GOL Board",
};

import { Provider } from "react-redux";
import { store } from "@/rdx/store";

export const realField = () => (
  <Provider store={store}>
    <GOLBoard />
  </Provider>
);
