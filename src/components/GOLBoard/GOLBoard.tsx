import React, { Component } from "react";
import { DrawField } from "./components";
import { GOLContainer } from "./styled";
import { StatusLine } from "./components";

interface GOLBoardProps {
  sizeX: number;
  sizeY: number;
  fullness: number;
}

interface GOLBoardState {
  fieldScheme: boolean[][];
  boardState: {
    status: "running" | "paused" | "stopped";
    interval: number;
    size: [number, number];
    fullness: number;
  };
}

export class GOLBoard extends Component<GOLBoardProps, GOLBoardState> {
  constructor(props: GOLBoardProps) {
    super(props);

    this.state = {
      fieldScheme:
        Array.from({ length: this.props.sizeY }).map(() => {
          return [...Array.from({ length: this.props.sizeX }).fill(false)];
        }) as boolean[][],
      boardState: {
        status: "stopped",
        interval: 500,
        size: [this.props.sizeX, this.props.sizeY],
        fullness: this.props.fullness,
      },
    };
  }

  cellClickHandler = (x: number, y: number): void => {
    const isXValid = x >= 0 && x < this.state.fieldScheme[0].length;
    const isYValid = y >= 0 && y < this.state.fieldScheme.length;
    const areCoordinatesValid = isXValid && isYValid;
    if (!areCoordinatesValid) {
      return;
    }

    this.setState((prevState) => {
      const newField = prevState.fieldScheme.map((row) => [...row]);
      newField[y][x] = !prevState.fieldScheme[y][x];

      return {
        fieldScheme: newField,
      };
    });
  };

  render() {
    return (
      <GOLContainer>
        <DrawField
          fieldScheme={this.state.fieldScheme}
          cellClickHandler={this.cellClickHandler}
        />
        <StatusLine
          size={this.state.boardState.size}
          interval={this.state.boardState.interval}
        />
      </GOLContainer>
    );
  }
}
