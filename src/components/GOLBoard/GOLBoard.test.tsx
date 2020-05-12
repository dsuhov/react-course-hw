import React from "react";
import { mount } from "enzyme";
import { GOLBoard } from "./GOLBoard";
import { DrawField } from "./components";

describe("Test GOLBoard Component", () => {
  it("GOLBoard passes DrawField correct props", () => {
    const x = 2;
    const y = 3;

    const golBoard = mount(<GOLBoard sizeX={x} sizeY={y} />);
    const boradField = golBoard.find(DrawField);

    expect(boradField.props()).toEqual({
      fieldScheme: [
        [false, false],
        [false, false],
        [false, false],
      ],
      cellClickHandler: expect.any(Function),
    });
  });

  it("Check GOLBoard renders field after click on cells", () => {
    const x = 2;
    const y = 3;

    const golBoard = mount(<GOLBoard sizeX={x} sizeY={y} />);

    golBoard.find(DrawField).props().cellClickHandler(0, 0);
    golBoard.find(DrawField).props().cellClickHandler(1, 1);
    golBoard.update();

    expect(golBoard.find(DrawField).props()).toEqual({
      fieldScheme: [
        [true, false],
        [false, true],
        [false, false],
      ],
      cellClickHandler: expect.any(Function),
    });
  });

  it("Check correctness of field size change", () => {
    const x = 2;
    const y = 3;

    const golBoard = mount(<GOLBoard sizeX={x} sizeY={y} />);

    golBoard.find(DrawField).props().cellClickHandler(0, 0);
    golBoard.find(DrawField).props().cellClickHandler(1, 1);

    golBoard.setProps({
      sizeX: 3,
      sizeY: 2,
    });

    expect(golBoard.find(DrawField).props()).toEqual({
      fieldScheme: [
        [true, false, false],
        [false, true, false],
      ],
      cellClickHandler: expect.any(Function),
    });
  });
});
