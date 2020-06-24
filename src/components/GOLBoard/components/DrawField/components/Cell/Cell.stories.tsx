import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import { RawCell as Cell } from "./Cell";
export default {
  title: "Cell",
  decorators: [withKnobs],
};

import { Provider } from "react-redux";
import { store } from "@/rdx/store";

export const nonAlive = () => (
  <Provider store={store}>
    <Cell
      isAlive={boolean("Alive or Dead", false)}
      cellClick={action("Cell clicked")}
      x={number("x", 10)}
      y={number("y", 23)}
    />
  </Provider>
);

export const nonAliveWithZeroX = () => (
  <Provider store={store}>
    <Cell
      isAlive={boolean("Alive or Dead", false)}
      cellClick={action("Cell clicked")}
      x={number("x", 0)}
      y={number("y", 23)}
    />
  </Provider>
);

export const nonAliveWithZeroY = () => (
  <Provider store={store}>
    <Cell
      isAlive={boolean("Alive or Dead", false)}
      cellClick={action("Cell clicked")}
      x={number("x", 12)}
      y={number("y", 0)}
    />
  </Provider>
);

export const nonAliveWithZeroXY = () => (
  <Provider store={store}>
    <Cell
      isAlive={boolean("Alive or Dead", false)}
      cellClick={action("Cell clicked")}
      x={number("x", 0)}
      y={number("y", 0)}
    />
  </Provider>
);

export const Alive = () => (
  <Provider store={store}>
    <Cell
      isAlive={boolean("Alive or Dead", true)}
      cellClick={action("Cell clicked")}
      x={number("x", 10)}
      y={number("y", 23)}
    />
  </Provider>
);
