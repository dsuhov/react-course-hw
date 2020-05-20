import React from "react";
import { render } from "react-dom";
import { GOLBoard } from "./components";

const defaultparams = {
  sizeX: 15,
  sizeY: 10,
  fullness: 20,
};

render(<GOLBoard {...defaultparams} />, document.getElementById("root"));
