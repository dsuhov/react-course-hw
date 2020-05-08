import React, { Component } from "react";
import { GOLBoardProps, GOLBoardState } from "types/interfaces";
import { DrawField } from "./components";

export class GOLBoard extends Component<GOLBoardProps, GOLBoardState> {
  constructor(props: GOLBoardProps) {
    super(props);

    this.state = {
      fieldScheme:
        Array.from({ length: props.sizeY }).map(() => {
          return [...Array.from({ length: props.sizeX }).fill(false)];
        }) as boolean[][],
    };
  }

  static changeSize(
    shiftX: number,
    shiftY: number,
    oldScheme: boolean[][]
  ): boolean[][] | null {
    let newScheme: boolean[][] | null = null;

    if (shiftY !== 0) {
      newScheme =
        shiftY < 0
          ? oldScheme.slice(0, oldScheme.length - shiftY * -1)
          : [
              ...oldScheme.map((row) => [...row]),
              ...new Array(shiftY).fill(
                new Array(oldScheme[0].length).fill(false)
              ),
            ];
    } else {
      newScheme = [...oldScheme.map((row) => [...row])];
    }

    if (shiftX !== 0) {
      newScheme =
        shiftX < 0
          ? newScheme.map((row) => {
              return row.slice(0, row.length - shiftX * -1);
            })
          : newScheme.map((row) => {
              return [...row, ...new Array(shiftX).fill(false)];
            });
    }

    return newScheme;
  }

  static getDerivedStateFromProps(props: GOLBoardProps, state: GOLBoardState) {
    if (
      props.sizeX != state.fieldScheme[0].length ||
      props.sizeY != state.fieldScheme.length
    ) {
      const newSizedScheme = GOLBoard.changeSize(
        props.sizeX - state.fieldScheme[0].length,
        props.sizeY - state.fieldScheme.length,
        state.fieldScheme
      );

      if (newSizedScheme) {
        return {
          fieldScheme: newSizedScheme,
        };
      }
    }

    return null;
  }

  cellClickHandler = (x: number, y: number): void => {
    const isXValid = x >= 0 && x < this.state.fieldScheme[0].length;
    const isYValid = y >= 0 && y < this.state.fieldScheme.length;
    const areCoordinatesValid = isXValid && isYValid;
    if (!areCoordinatesValid) {
      return;
    }

    const newField = this.state.fieldScheme.map((row) => [...row]);
    newField[y][x] = !this.state.fieldScheme[y][x];

    this.setState({ fieldScheme: newField });
  };

  render() {
    return (
      <DrawField
        fieldScheme={this.state.fieldScheme}
        cellClickHandler={this.cellClickHandler}
      />
    );
  }
}
