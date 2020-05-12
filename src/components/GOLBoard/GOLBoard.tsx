import React, { Component } from "react";
import { DrawField } from "./components";
import { changeSize } from "./changeSize";
import { GOLContainer } from "./styled";

interface GOLBoardProps {
  sizeX: number;
  sizeY: number;
}

interface GOLBoardState {
  fieldScheme: boolean[][];
}

export class GOLBoard extends Component<GOLBoardProps, GOLBoardState> {
  state = {
    fieldScheme:
      Array.from({ length: this.props.sizeY }).map(() => {
        return [...Array.from({ length: this.props.sizeX }).fill(false)];
      }) as boolean[][],
  };

  static getDerivedStateFromProps(props: GOLBoardProps, state: GOLBoardState) {
    if (
      props.sizeX != state.fieldScheme[0].length ||
      props.sizeY != state.fieldScheme.length
    ) {
      const newSizedScheme = changeSize(
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
      </GOLContainer>
    );
  }
}
