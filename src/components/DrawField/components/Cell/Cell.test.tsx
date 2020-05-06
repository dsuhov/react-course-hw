import React from "react";
// import { mount } from "enzyme";
import renderer from "react-test-renderer";

import { Cell } from "./Cell";

const deadCellProps = {
  x: 5,
  y: 5,
  isAlive: false,
};

const aliveCellProps = {
  x: 5,
  y: 5,
  isAlive: true,
};

describe("Cell", () => {
  it("renders dead cell", () => {
    expect(
      renderer
        .create(<Cell {...deadCellProps} clickHandler={jest.fn()} />)
        .toJSON()
    ).toMatchSnapshot();
  });

  it("renders dead cell", () => {
    expect(
      renderer
        .create(<Cell {...aliveCellProps} clickHandler={jest.fn()} />)
        .toJSON()
    ).toMatchSnapshot();
  });
});
