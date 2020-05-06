import React, { Component } from "react";
import { CellProps } from "types/Cell";
import { CellDrawn } from "./CellDrawn";

export class Cell extends Component<CellProps> {
  constructor(props: CellProps) {
    super(props);
  }

  shouldComponentUpdate(nextProps: CellProps) {
    return this.props.isAlive !== nextProps.isAlive;
  }

  render() {
    return (
      <CellDrawn
        {...this.props}
        onClick={() => this.props.clickHandler(this.props.x, this.props.y)}
      />
    );
  }
}