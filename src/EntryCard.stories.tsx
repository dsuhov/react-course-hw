import React from "react";
import { action } from "@storybook/addon-actions";
import { withKnobs, text, boolean } from "@storybook/addon-knobs";
import EntryCard from "./EntryCard";

export default {
  title: "Entry Card",
  decorators: [withKnobs],
};

export const withDefaultValues = () => (
  <EntryCard
    entryClickHandler={action("Card Clicked")}
    definition={text("Entry Definition", "Dog")}
    meaning={text("Entry Meaning", "Собака")}
    id={1}
  />
);

export const withDisabled = () => (
  <EntryCard
    disabled={boolean("Diasbled", false)}
    entryClickHandler={action("Card Clicked")}
    definition={text("Entry Definition", "Dog")}
    meaning={text("Entry Meaning", "Собака")}
    id={1}
  />
);
