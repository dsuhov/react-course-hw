import React from "react";
import { render } from "react-dom";
import { GOLBoard } from "./components";

const defaultparams = {
  sizeX: 40,
  sizeY: 30,
};

render(<GOLBoard {...defaultparams} />, document.getElementById("root"));
