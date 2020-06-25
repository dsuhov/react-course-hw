import React from "react";
import { CellDrawn } from "./CellDrawn";
import { connect } from "react-redux";
import { gameFieldActions } from "@/rdx/gameField/gameFieldSlice";

export interface CellProps {
  // x-coordinate of the cell
  x: number;
  // y-coordinate of the cell
  y: number;
  // status of the cell, dead of alive
  isAlive: boolean;
  cellClick: (coords: CellCorrds) => void;
}

export class RawCell extends React.PureComponent<CellProps> {
  render() {
    const { x, y } = this.props;

    return (
      <CellDrawn
        {...this.props}
        onClick={() => this.props.cellClick({ x, y })}
      />
    );
  }
}

const mapDispatchToProps = {
  cellClick: gameFieldActions.cellClick,
};

export const Cell = connect(null, mapDispatchToProps)(RawCell);
