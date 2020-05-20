import React from "react";
import { withKnobs, number } from "@storybook/addon-knobs";
import { GOLBoard } from "./GOLBoard";
export default {
  title: "GOL Board",
  decorators: [withKnobs],
};

export const realField = () => (
  <GOLBoard
    sizeX={number("X Size", 15)}
    fullness={25}
    sizeY={number("Y Size", 12)}
  />
);
