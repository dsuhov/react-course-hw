import React, { Component } from "react";
import { DrawField } from "./components";
import { GOLContainer } from "./styled";
import { StatusLine } from "./components";
import { ControlsArea } from "./components";
import { Ticker } from "./utils/Ticker";
import { getUpdatedField } from "./utils/getUpdatedField";
import { clearField } from "./utils/clearField";
import { fillField } from "./utils/fillField";

interface GOLBoardProps {
  sizeX: number;
  sizeY: number;
}

interface GOLBoardState {
  fieldScheme: boolean[][];
  status: "running" | "paused" | "stopped";
}

export class GOLBoard extends Component<GOLBoardProps, GOLBoardState> {
  private ticker: Ticker;

  constructor(props: GOLBoardProps) {
    super(props);

    this.state = {
      fieldScheme: clearField([this.props.sizeX, this.props.sizeY]),
      status: "stopped",
    };

    this.ticker = new Ticker(this.updateField, 200);
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

  ctrlBtnHadler = (cmd: string): void => {
    switch (cmd) {
      case "pause":
        this.stopGame();
        break;
      case "resume":
        this.resumeGame();
        break;
      case "reset":
        this.clearGame();
        break;
      case "faster":
        this.changeSpeed("faster");
        break;
      case "slower":
        this.changeSpeed("slower");
        break;
    }
  };

  ctrlFormHandler = (size: [number, number], fullness: number): void => {
    const newField = fillField(fullness, size[0], size[1]);

    this.setState(
      {
        fieldScheme: newField,
        status: "running",
      },
      () => {
        this.ticker.start();
      }
    );
  };

  changeSpeed(cmd: "faster" | "slower"): void {
    this.ticker.stop();
    let speed = this.ticker.getSpeed();

    if (cmd === "faster") {
      speed -= 200;

      if (speed < 200) {
        speed = 200;
      }
    }
    if (cmd === "slower") {
      speed += 200;
    }

    this.ticker.start(speed);
  }

  updateField = () => {
    this.setState((prevState) => {
      const newField = getUpdatedField(prevState.fieldScheme);

      return {
        fieldScheme: newField,
      };
    });
  };

  stopGame() {
    this.ticker.stop();

    this.setState({
      status: "paused",
    });
  }

  clearGame() {
    this.ticker.stop();

    this.setState((prevState) => {
      const size: [number, number] = [
        prevState.fieldScheme[0].length,
        prevState.fieldScheme.length,
      ];

      const newField = clearField([size[0], size[1]]);

      return {
        fieldScheme: newField,
        status: "stopped",
      };
    });
  }

  resumeGame() {
    this.ticker.start();

    this.setState({
      status: "running",
    });
  }

  render() {
    const size: [number, number] = [
      this.state.fieldScheme[0].length,
      this.state.fieldScheme.length,
    ];

    const speed = this.ticker.getSpeed();

    return (
      <GOLContainer>
        <DrawField
          fieldScheme={this.state.fieldScheme}
          cellClickHandler={this.cellClickHandler}
        />
        <StatusLine size={size} interval={speed} />
        <ControlsArea
          status={this.state.status}
          cmdBtnHandler={this.ctrlBtnHadler}
          cmdFormHandler={this.ctrlFormHandler}
        />
      </GOLContainer>
    );
  }
}
