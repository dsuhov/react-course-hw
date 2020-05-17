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
  cmdBtnHadler: (evt: React.MouseEvent) => void;
  cmdFormHandler: (params: {
    size: [number, number];
    fullness: number;
  }) => void;
}

export class ControlsArea extends React.Component<ControlsAreaProps, {}> {
  xSizeInput = React.createRef<HTMLInputElement>();
  ySizeInput = React.createRef<HTMLInputElement>();
  fullnessInput = React.createRef<HTMLInputElement>();

  shouldComponentUpdate(nextProps: ControlsAreaProps) {
    return this.props.status !== nextProps.status;
  }

  handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    const sizeX = this.xSizeInput.current!.value;
    const sizeY = this.ySizeInput.current!.value;
    const fullness = this.fullnessInput.current!.value;

    this.props.cmdFormHandler({
      size: [+sizeX, +sizeY],
      fullness: +fullness,
    });
  };

  render() {
    const status = this.props.status;
    const cmdBtnHadler = this.props.cmdBtnHadler;

    return (
      <ControlsWrapper>
        <ControlsLine>
          <Buttons>
            <Button
              name="faster"
              onClick={cmdBtnHadler}
              disabled={status !== "running"}
            >
              Faster
            </Button>
            <Button
              name="slower"
              onClick={cmdBtnHadler}
              disabled={status !== "running"}
            >
              Faster
            </Button>
            <Button
              name={status === "paused" ? "resume" : "pause"}
              onClick={cmdBtnHadler}
              disabled={status !== "running"}
            >
              {status === "paused" ? "Resume" : "Pause"}
            </Button>
            <Button
              name="reset"
              onClick={cmdBtnHadler}
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
              <NumberInput type="number" min={2} max={200} name="xSize" />
              <span> x </span>
              <NumberInput type="number" min={2} max={200} name="ySize" />
            </FieldSize>
            <div>
              <Label>Fullness:</Label>
              <NumberInput type="number" name="fullness" min={10} max={100} />
              <span> %</span>
            </div>
          </ControlsLine>

          <ControlsLine>
            <StartBlock>
              <button
                type="submit"
                name="start"
                disabled={status === "running" || status === "paused"}
              >
                Start
              </button>
            </StartBlock>
          </ControlsLine>
        </form>
      </ControlsWrapper>
    );
  }
}
