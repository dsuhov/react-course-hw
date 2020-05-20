import React from "react";
import { mount } from "enzyme";
import { GOLBoard } from "./GOLBoard";
import { DrawField } from "./components";

describe("Test GOLBoard Component", () => {
  const x = 2;
  const y = 3;
  const fullness = 10;

  it("GOLBoard passes DrawField correct props", () => {
    const golBoard = mount(
      <GOLBoard sizeX={x} sizeY={y} fullness={fullness} />
    );
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
    const golBoard = mount(
      <GOLBoard sizeX={x} sizeY={y} fullness={fullness} />
    );

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
});
