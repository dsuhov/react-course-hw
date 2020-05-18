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
  private ticker: Ticker;

  constructor(props: GOLBoardProps) {
    super(props);

    this.state = {
      fieldScheme: clearField([this.props.sizeX, this.props.sizeY]),
      boardState: {
        status: "stopped",
        interval: 500,
        size: [this.props.sizeX, this.props.sizeY],
        fullness: this.props.fullness,
      },
    };

    this.ticker = new Ticker(this.updateField);
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

  ctrlBtnHadler = (evt: React.MouseEvent): void => {
    const cmd = (evt.target as HTMLButtonElement).name;

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

  ctrlFormHandler = (params: {
    size: [number, number];
    fullness: number;
  }): void => {
    this.setState((prevState) => {
      const newField = fillField(
        params.fullness,
        params.size[0],
        params.size[1]
      );

      return {
        fieldScheme: newField,
        boardState: {
          ...prevState.boardState,
          size: [params.size[0], params.size[1]],
          fullness: params.fullness,
        },
      };
    });

    this.startGame();
  };

  changeSpeed(cmd: "faster" | "slower"): void {
    this.ticker.stop();

    if (cmd === "faster") {
      this.setState((prevState) => {
        const currSpeed = prevState.boardState.interval;

        return {
          boardState: {
            ...prevState.boardState,
            interval: currSpeed >= 200 ? currSpeed - 50 : currSpeed,
          },
        };
      });

      this.ticker.start(this.state.boardState.interval);
    }

    if (cmd === "slower") {
      this.setState((prevState) => {
        const currSpeed = prevState.boardState.interval;
        return {
          boardState: {
            ...prevState.boardState,
            interval: currSpeed + 50,
          },
        };
      });

      this.ticker.start(this.state.boardState.interval);
    }
  }

  updateField = () => {
    this.setState((prevState) => {
      const newField = getUpdatedField(prevState.fieldScheme);

      return {
        fieldScheme: newField,
      };
    });
  };

  startGame() {
    this.setState((prevState) => {
      return {
        boardState: {
          ...prevState.boardState,
          status: "running",
        },
      };
    });

    this.ticker.start(this.state.boardState.interval);
  }

  stopGame() {
    this.ticker.stop();

    this.setState((prevState) => {
      return {
        boardState: {
          ...prevState.boardState,
          status: "paused",
        },
      };
    });
  }

  clearGame() {
    this.ticker.stop();

    this.setState((prevState) => {
      const newField = clearField([
        prevState.boardState.size[0],
        prevState.boardState.size[1],
      ]);

      return {
        fieldScheme: newField,
        boardState: {
          ...prevState.boardState,
          status: "stopped",
        },
      };
    });
  }

  resumeGame() {
    this.ticker.start(this.state.boardState.interval);

    this.setState((prevState) => {
      return {
        boardState: {
          ...prevState.boardState,
          status: "running",
        },
      };
    });
  }

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
        <ControlsArea
          status={this.state.boardState.status}
          cmdBtnHadler={this.ctrlBtnHadler}
          cmdFormHandler={this.ctrlFormHandler}
        />
      </GOLContainer>
    );
  }
}
