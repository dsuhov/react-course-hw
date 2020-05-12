import React, { FC } from "react";
import styled from "@emotion/styled";
import { Cell } from "./components";

interface DrawFieldProps {
  fieldScheme: boolean[][];
  cellClickHandler: (x: number, y: number) => void;
}

interface FieldWrapperProps {
  size: number;
}

const FieldWrapper = styled.div<FieldWrapperProps>`
  display: flex;
  flex-wrap: wrap;
  ${({ size }: FieldWrapperProps) => `width: ${size * 11 + 1}px`};
  margin: 0 auto;
  border: 5px solid #cdc392;
  box-shadow: 0 0 10px #304c89;
  border-radius: 2px;
`;

export const DrawField: FC<DrawFieldProps> = ({
  fieldScheme,
  cellClickHandler,
}) => {
  return (
    <FieldWrapper size={fieldScheme[0].length}>
      {fieldScheme.map((row, y) => [
        ...row.map((status: boolean, x) => (
          <Cell
            key={`${x}_${y}`}
            x={x}
            y={y}
            clickHandler={cellClickHandler}
            isAlive={status}
          />
        )),
      ])}
    </FieldWrapper>
  );
};
