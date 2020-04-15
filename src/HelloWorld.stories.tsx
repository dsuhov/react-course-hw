import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";

import HelloWorld from "./HelloWorld";

export default {
  title: "HelloWorld simple text",
  decorators: [withKnobs],
};

export const HelloWorldStory: React.FC<{}> = () => (
  <HelloWorld username={text("Текст для username", "Кипяток")} />
);
