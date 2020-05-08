import React, { FC } from "react";
import { DrawFieldProps } from "types/interfaces";
import styled from "@emotion/styled";
import { Cell } from "./components";

interface FieldWrapperProps {
  size: number;
}

const FieldWrapper = styled.div<FieldWrapperProps>`
  display: flex;
  flex-wrap: wrap;
  ${({ size }: FieldWrapperProps) => `width: ${size * 11 + 1}px`};
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
