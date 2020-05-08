import React from "react";
import { render } from "react-dom";

import { GOLBoard } from "./components";

render(<GOLBoard sizeX={20} sizeY={16} />, document.getElementById("root"));
