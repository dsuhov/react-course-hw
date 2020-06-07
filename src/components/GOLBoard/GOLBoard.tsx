import React, { Component } from "react";
import { DrawField } from "./components";
import { GOLContainer } from "./styled";
import { StatusLine } from "./components";
import { ControlsArea } from "./components";
import { Ticker } from "./utils/Ticker";

import { connect } from "react-redux";
import {
  updateField,
  clearFieldAct,
  updateStatus,
  updateInterval,
  UpdIntAction,
  fillField,
  cellClick,
} from "@/rdx/actions/actions";

interface GOLBoardProps {
  status: GameStatus;
  fieldScheme: FieldScheme;
  updateField: () => void;
  updateStatus: (status: GameStatus) => void;
  clearFieldAct: () => void;
  fillField: (size: [number, number], fullness: number) => void;
  cellClick: (coords: CellCorrds) => void;
  updateInterval: (interval: number) => UpdIntAction;
}

export class RawGOLBoard extends Component<GOLBoardProps, {}> {
  private ticker: Ticker;

  constructor(props: GOLBoardProps) {
    super(props);
    this.ticker = new Ticker(this.updateField);
  }

  cellClickHandler = (x: number, y: number): void => {
    this.props.cellClick({ x, y });
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
    this.props.fillField(size, fullness);
    this.ticker.start();
    this.props.updateStatus("running");
  };

  changeSpeed(cmd: "faster" | "slower"): void {
    if (cmd === "faster") {
      this.ticker.setFaster();
      this.props.updateInterval(this.ticker.getSpeed());
    }
    if (cmd === "slower") {
      this.ticker.setSlower();
      this.props.updateInterval(this.ticker.getSpeed());
    }
  }

  updateField = () => {
    this.props.updateField();
  };

  stopGame() {
    this.ticker.stop();
    this.props.updateStatus("paused");
  }

  clearGame() {
    this.ticker.stop();

    this.props.clearFieldAct();
    this.props.updateStatus("stopped");
  }

  resumeGame() {
    this.ticker.start();

    this.props.updateStatus("running");
  }

  render() {
    return (
      <GOLContainer>
        <DrawField />
        <StatusLine />
        <ControlsArea
          status={this.props.status}
          cmdBtnHandler={this.ctrlBtnHadler}
          cmdFormHandler={this.ctrlFormHandler}
        />
      </GOLContainer>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    fieldScheme: state.golField,
    status: state.gameStatus.status,
  };
};

const mapDispatchToProps = {
  updateField,
  updateStatus,
  clearFieldAct,
  fillField,
  cellClick,
  updateInterval,
};

export const GOLBoard = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawGOLBoard);
