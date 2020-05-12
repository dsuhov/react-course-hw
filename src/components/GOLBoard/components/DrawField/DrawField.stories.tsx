import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs } from "@storybook/addon-knobs";
import { DrawField } from "./DrawField";
export default {
  title: "Draw Field",
  decorators: [withKnobs],
};

const fieldShemeEmpty = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

const fieldShemeFull = [
  [true, true, true, true],
  [true, true, true, true],
  [true, true, true, true],
  [true, true, true, true],
];

const fieldShemePartial = [
  [true, false, false, false, false],
  [false, false, true, false, false],
  [false, false, true, true, true],
  [false, false, true, false, false],
  [false, false, false, false, false],
];

export const fieldEmpty = () => (
  <DrawField
    fieldScheme={fieldShemeEmpty}
    cellClickHandler={action("Cell clicked")}
  />
);

export const fieldFull = () => (
  <DrawField
    fieldScheme={fieldShemeFull}
    cellClickHandler={action("Cell clicked")}
  />
);

export const fieldPartial = () => (
  <DrawField
    fieldScheme={fieldShemePartial}
    cellClickHandler={action("Cell clicked")}
  />
);
