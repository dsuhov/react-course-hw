import React from "react";
import { render } from "react-dom";
import { defaultConfig } from "config/defaultConfig";
import { GOLBoard } from "./components";

const { x, y } = defaultConfig.size;

render(<GOLBoard sizeX={x} sizeY={y} />, document.getElementById("root"));
