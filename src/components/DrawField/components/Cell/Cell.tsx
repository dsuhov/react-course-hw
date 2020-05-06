import React, { FC } from "react";
import { CellProps } from "types/Cell";
import { CellDrawn } from "./CellDrawn";

export const Cell: FC<CellProps> = ({ x, y, isAlive, clickHandler }) => {
  return (
    <CellDrawn
      isAlive={isAlive}
      onClick={() => clickHandler(x, y)}
      x={x}
      y={y}
    />
  );
};
