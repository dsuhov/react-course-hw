import React from "react";
import { mount, shallow } from "enzyme";
import { GOLBoard } from "./GOLBoard";
import { DrawField } from "./components";
import { ControlsArea } from "./components";
import { StatusLine } from "./components";

const baseX = 2;
const baseY = 3;

jest.mock("./utils/fillField.ts", () => {
  return {
    fillField: () => {
      return [
        [false, false, false, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, true, false, false],
        [false, false, false, false, false],
      ];
    },
  };
});

const targetFieldAfterUpdate = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, true, true, true, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

jest.mock("./utils/Ticker.ts");

describe("Test GOLBoard Component", () => {
  it("GOLBoard passes DrawField correct props", () => {
    const golBoard = mount(<GOLBoard sizeX={baseX} sizeY={baseY} />);
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
    const golBoard = mount(<GOLBoard sizeX={baseX} sizeY={baseY} />);

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

  it("Check GOLBoard start cmd", () => {
    const golBoard = shallow(<GOLBoard sizeX={baseX} sizeY={baseY} />);
    const startCmd = golBoard.find(ControlsArea).props().cmdFormHandler;

    startCmd([10, 10], 50);

    expect(golBoard.find(DrawField).props().fieldScheme).toEqual(
      targetFieldAfterUpdate
    );

    expect(golBoard.find(ControlsArea).props().status).toBe("running");

    expect(golBoard.find(StatusLine).props().size).toEqual([
      targetFieldAfterUpdate[0].length,
      targetFieldAfterUpdate.length,
    ]);
  });

  it("Check game status changes", () => {
    const cmdPause = "pause";
    const cmdResume = "resume";
    const cmdClear = "reset";

    const golBoard = shallow(<GOLBoard sizeX={baseX} sizeY={baseY} />);
    const btnCmd = golBoard.find(ControlsArea).props().cmdBtnHandler;

    btnCmd(cmdPause);
    expect(golBoard.find(ControlsArea).props().status).toBe("paused");
    btnCmd(cmdResume);
    expect(golBoard.find(ControlsArea).props().status).toBe("running");
    btnCmd(cmdClear);
    expect(golBoard.find(ControlsArea).props().status).toBe("stopped");
  });
});
