import React from "react";
import { connect } from "react-redux";
import {
  ControlsWrapper,
  ControlsLine,
  Buttons,
  FieldSize,
  Label,
  StartBlock,
  NumberInput,
  Button,
} from "./styled";
import { RootState } from "@/rdx/store";
import { gameFieldActions } from "@/rdx/gameField/gameFieldSlice";
import { gameStatusActions } from "@/rdx/gameStatus/gameStatusSlice";
import { Ticker } from "./Ticker";

const mapDispatchToProps = {
  updateField: gameFieldActions.updateField,
  clearField: gameFieldActions.clearField,
  fillField: gameFieldActions.fillFieldAct,
  cellClick: gameFieldActions.cellClick,
  updateStatus: gameStatusActions.updateStatus,
  updateInterval: gameStatusActions.updateInterval,
  incGen: gameStatusActions.incGen,
};

const mapStateToProps = (state: RootState) => {
  return {
    status: state.gameStatus.status,
    interval: state.gameStatus.interval,
  };
};

type ControlsAreaProps = typeof mapDispatchToProps &
  ReturnType<typeof mapStateToProps>;

export class RawControlsArea extends React.PureComponent<ControlsAreaProps> {
  xSizeInput = React.createRef<HTMLInputElement>();
  ySizeInput = React.createRef<HTMLInputElement>();
  fullnessInput = React.createRef<HTMLInputElement>();

  private ticker: Ticker;

  constructor(props: ControlsAreaProps) {
    super(props);
    this.ticker = new Ticker(this.updateField);
  }

  handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const sizeX = this.xSizeInput.current!.value;
    const sizeY = this.ySizeInput.current!.value;
    const fullness = +this.fullnessInput.current!.value;

    this.props.fillField({
      fullness,
      size: [+sizeX, +sizeY],
    });
    this.props.updateStatus("running");
    this.ticker.setSpeed(this.props.interval);
    this.ticker.start();
  };

  btnClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const btnElName = evt.currentTarget.name;

    switch (btnElName) {
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
    this.props.incGen();
  };

  stopGame() {
    this.ticker.stop();
    this.props.updateStatus("paused");
  }

  clearGame() {
    this.ticker.stop();
    this.props.clearField();
    this.props.updateStatus("stopped");
  }

  resumeGame() {
    this.ticker.start();
    this.props.updateStatus("running");
  }

  render() {
    const status = this.props.status;

    return (
      <ControlsWrapper>
        <ControlsLine>
          <Buttons>
            <Button
              name="faster"
              onClick={this.btnClickHandler}
              disabled={status !== "running"}
            >
              Faster
            </Button>
            <Button
              name="slower"
              onClick={this.btnClickHandler}
              disabled={status !== "running"}
            >
              Slower
            </Button>
            <Button
              name={status === "paused" ? "resume" : "pause"}
              onClick={this.btnClickHandler}
              disabled={status === "stopped"}
            >
              {status === "paused" ? "Resume" : "Pause"}
            </Button>
            <Button
              name="reset"
              onClick={this.btnClickHandler}
              disabled={status !== "paused"}
            >
              Reset
            </Button>
          </Buttons>
        </ControlsLine>

        <form onSubmit={this.handleSubmit}>
          <ControlsLine>
            <FieldSize>
              <Label>Field Size:</Label>
              <NumberInput
                type="number"
                min={2}
                max={200}
                name="xSize"
                ref={this.xSizeInput}
                required
              />
              <span> x </span>
              <NumberInput
                type="number"
                min={2}
                max={200}
                name="ySize"
                ref={this.ySizeInput}
                required
              />
            </FieldSize>
            <div>
              <Label>Fullness:</Label>
              <NumberInput
                type="number"
                name="fullness"
                min={10}
                max={100}
                ref={this.fullnessInput}
                required
              />
              <span> %</span>
            </div>
          </ControlsLine>

          <ControlsLine>
            <StartBlock>
              <Button
                type="submit"
                name="start"
                disabled={status === "running" || status === "paused"}
              >
                Start
              </Button>
            </StartBlock>
          </ControlsLine>
        </form>
      </ControlsWrapper>
    );
  }
}

export const ControlsArea = connect(
  mapStateToProps,
  mapDispatchToProps
)(RawControlsArea);
