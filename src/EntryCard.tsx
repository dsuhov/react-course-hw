import React from "react";
import type { EntryCardProps } from "./interfaces";

const EntryCard: React.FC<EntryCardProps> = (props) =>
  props.disabled ? (
    <h3>Deleted.</h3>
  ) : (
    <dl onClick={() => props.entryClickHandler(!props.disabled, props.id)}>
      <dt>{props.definition}</dt>
      <dd>{props.meaning}</dd>
    </dl>
  );

export default EntryCard;
