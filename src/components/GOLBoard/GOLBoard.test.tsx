import React from "react";
import { mount, shallow } from "enzyme";
import { GOLBoard } from "./GOLBoard";
import { DrawField } from "./components";
import { ControlsArea } from "./components";
import { StatusLine } from "./components";
import { createStore, Store } from "redux";
import { Provider } from "react-redux";
import { reducer } from "@/rdx/reducers";

const baseState =
  [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
  ] as FieldScheme;

const baseStatus =
  {
    status: "running",
  } as StatusState;

const targetFieldAfterUpdate = [
  [false, false, false, false, false],
  [false, false, false, false, false],
  [false, true, true, true, false],
  [false, false, false, false, false],
  [false, false, false, false, false],
];

const rootState =
  {
    golField: baseState,
    gameStatus: baseStatus,
  } as GOLState;

jest.mock("./utils/Ticker.ts");

describe("Test GOLBoard Component", () => {
  let store: Store<GOLState>;

  beforeEach(() => {
    store = createStore(reducer, rootState);
  });

  it("GOLBoard passes DrawField correct props", () => {
    
  });

  // it("Check GOLBoard renders field after click on cells", () => {
  //   const golBoard = mount(<GOLBoard />);

  //   golBoard.find(DrawField).props().cellClickHandler(0, 0);
  //   golBoard.find(DrawField).props().cellClickHandler(1, 1);
  //   golBoard.update();

  //   expect(golBoard.find(DrawField).props()).toEqual({
  //     fieldScheme: [
  //       [true, false],
  //       [false, true],
  //       [false, false],
  //     ],
  //     cellClickHandler: expect.any(Function),
  //   });
  // });

  // it("Check GOLBoard start cmd", () => {
  //   const golBoard = shallow(<GOLBoard />);
  //   const startCmd = golBoard.find(ControlsArea).props().cmdFormHandler;

  //   startCmd([10, 10], 50);

  //   expect(golBoard.find(DrawField).props().fieldScheme).toEqual(
  //     targetFieldAfterUpdate
  //   );

  //   expect(golBoard.find(ControlsArea).props().status).toBe("running");

  //   expect(golBoard.find(StatusLine).props().size).toEqual([
  //     targetFieldAfterUpdate[0].length,
  //     targetFieldAfterUpdate.length,
  //   ]);
  // });

  // it("Check game status changes", () => {
  //   const cmdPause = "pause";
  //   const cmdResume = "resume";
  //   const cmdClear = "reset";

  //   const golBoard = shallow(<GOLBoard />);
  //   const btnCmd = golBoard.find(ControlsArea).props().cmdBtnHandler;

  //   btnCmd(cmdPause);
  //   expect(golBoard.find(ControlsArea).props().status).toBe("paused");
  //   btnCmd(cmdResume);
  //   expect(golBoard.find(ControlsArea).props().status).toBe("running");
  //   btnCmd(cmdClear);
  //   expect(golBoard.find(ControlsArea).props().status).toBe("stopped");
  // });
});
