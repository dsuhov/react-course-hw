import React from "react";
import { DrawField } from "./components";
import { GOLContainer } from "./styled";
import { StatusLine } from "./components";
import { ControlsArea } from "./components";

export const GOLBoard: React.FC = () => {
  return (
    <GOLContainer>
      <DrawField />
      <StatusLine />
      <ControlsArea />
    </GOLContainer>
  );
};
