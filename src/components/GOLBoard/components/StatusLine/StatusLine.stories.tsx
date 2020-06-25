import React from "react";
import { StatusLine } from "./StatusLine";

import { Provider } from "react-redux";
import { store } from "@/rdx/store";

export default {
  title: "Status Line",
};

export const statusLine = () => {
  return (
    <Provider store={store}>
      <StatusLine />
    </Provider>
  );
};
