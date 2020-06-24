import React from "react";
import { action } from "@storybook/addon-actions";
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

// export const controlsAreaBoardPaused = () => {
//   return (
//     <ControlsArea
//       status="paused"
//       cmdBtnHadler={action("Cmd Handler Click")}
//       cmdFormHandler={action("Form Submitted")}
//     />
//   );
// };

// export const controlsAreaBoardStopped = () => {
//   return (
//     <ControlsArea
//       status="stopped"
//       cmdBtnHadler={action("Cmd Handler Click")}
//       cmdFormHandler={action("Form Submitted")}
//     />
//   );
// };
