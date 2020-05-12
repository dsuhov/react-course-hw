import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, number, boolean } from "@storybook/addon-knobs";
import { Cell } from "./Cell";
export default {
  title: "Cell",
  decorators: [withKnobs],
};

export const nonAlive = () => (
  <Cell
    isAlive={boolean("Alive or Dead", false)}
    clickHandler={action("Cell clicked")}
    x={number("x", 10)}
    y={number("y", 23)}
  />
);

export const nonAliveWithZeroX = () => (
  <Cell
    isAlive={boolean("Alive or Dead", false)}
    clickHandler={action("Cell clicked")}
    x={number("x", 0)}
    y={number("y", 23)}
  />
);

export const nonAliveWithZeroY = () => (
  <Cell
    isAlive={boolean("Alive or Dead", false)}
    clickHandler={action("Cell clicked")}
    x={number("x", 12)}
    y={number("y", 0)}
  />
);

export const nonAliveWithZeroXY = () => (
  <Cell
    isAlive={boolean("Alive or Dead", false)}
    clickHandler={action("Cell clicked")}
    x={number("x", 0)}
    y={number("y", 0)}
  />
);

export const Alive = () => (
  <Cell
    isAlive={boolean("Alive or Dead", true)}
    clickHandler={action("Cell clicked")}
    x={number("x", 10)}
    y={number("y", 23)}
  />
);
