import React from "react";
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

interface ControlsAreaProps {
  status: "running" | "paused" | "stopped";
  cmdBtnHandler: (cmd: string) => void;
  cmdFormHandler: (size: [number, number], fullness: number) => void;
}

export class ControlsArea extends React.PureComponent<ControlsAreaProps> {
  xSizeInput = React.createRef<HTMLInputElement>();
  ySizeInput = React.createRef<HTMLInputElement>();
  fullnessInput = React.createRef<HTMLInputElement>();

  handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const sizeX = this.xSizeInput.current!.value;
    const sizeY = this.ySizeInput.current!.value;
    const fullness = this.fullnessInput.current!.value;

    this.props.cmdFormHandler([+sizeX, +sizeY], +fullness);
  };

  btnClickHandler = (evt: React.MouseEvent<HTMLButtonElement>) => {
    const btnElName = evt.currentTarget.name;
    this.props.cmdBtnHandler(btnElName);
  };

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
