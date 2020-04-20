import React from "react";
import { withKnobs, object } from "@storybook/addon-knobs";
import Dictionary from "./Dictionary";

export default {
  title: "Dictionary",
  decorators: [withKnobs],
};

const dicionaryProps = [
  ["dog", "Собака"],
  ["cat", "Кошка"],
  ["mouse", "Мышь"],
];

export const withDefaultValues = () => (
  <Dictionary entryCardsList={object("Входные данные", dicionaryProps)} />
);
