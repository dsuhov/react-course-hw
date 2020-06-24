import React from "react";
import { ControlsArea } from "./ControlsArea";
export default {
  title: "Controls Area",
};

import { Provider } from "react-redux";
import { store } from "@/rdx/store";

export const controlsAreaBoardRunning = () => {
  return (
    <Provider store={store}>
      <ControlsArea />
    </Provider>
  );
};
