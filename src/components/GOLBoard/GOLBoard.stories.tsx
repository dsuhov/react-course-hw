import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { GOLBoard } from "./GOLBoard";
export default {
  title: "Real Field",
  decorators: [withKnobs],
};

export const realField = () => (
  <GOLBoard sizeX={number("X Size", 2)} sizeY={number("Y Size", 3)} />
);
