import React from "react";
import { mount } from "enzyme";
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

  it("calls сlick callback on click by dead cell", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Cell {...deadCellProps} clickHandler={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("calls сlick callback on click by alive cell", () => {
    const onClick = jest.fn();
    const wrapper = mount(<Cell {...aliveCellProps} clickHandler={onClick} />);
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalled();
  });

  it("calls click callback with passed x, y params", () => {
    const onClick = jest.fn();
    const x = 12;
    const y = 14;
    const wrapper = mount(
      <Cell clickHandler={onClick} x={x} y={y} isAlive={true} />
    );
    wrapper.simulate("click");
    expect(onClick).toHaveBeenCalledWith(x, y);
  });
});
