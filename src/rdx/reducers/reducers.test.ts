import { reducer } from "./index";
import * as actCreators from "@/rdx/actions/actions";
import * as actionTypes from "@/rdx/actions/actionTypes";
import { CombinedState } from "redux";
import { fillField } from "@/utils/fillField";
import { clearField } from "@/utils/clearField";

jest.mock("@/utils/fillField", () => ({
  fillField: jest.fn(),
}));

jest.mock("@/utils/clearField", () => ({
  clearField: jest.fn(() => [[]]),
}));

describe("Test reducers", () => {
  const baseState: CombinedState<GOLState> = {
    golField: [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ],
    gameStatus: {
      status: "stopped",
      interval: 200,
      generation: 0,
    },
  };

  it("update field action", () => {
    const action = actCreators.updateField();
    const result = reducer(baseState, action);
    const expRes =
      [
        [false, false, false, false, false] as const,
        [false, false, false, false, false] as const,
        [false, true, true, true, false] as const,
        [false, false, false, false, false] as const,
        [false, false, false, false, false] as const,
      ] as const;

    expect(result.golField).toEqual(expRes);
  });

  it("update status action", () => {
    const action = actCreators.updateStatus("running");
    const result = reducer(baseState, action);
    const expRes = "running";

    expect(result.gameStatus.status).toBe(expRes);
  });

  it("clear field action", () => {
    const action = actCreators.clearFieldAct();
    reducer(baseState, action);

    expect(action).toEqual({
      type: actionTypes.CLEAR_FIELD,
    });
    expect(clearField).toBeCalled();
  });

  it("fill field action", () => {
    const size = [10, 14] as [number, number];
    const fullness = 48;

    (fillField as jest.Mock).mockResolvedValue([[]]);

    const action = actCreators.fillField(size, fullness);
    reducer(baseState, action);

    expect(action).toEqual({
      type: actionTypes.FILL_FIELD,
      payload: {
        size,
        fullness,
      },
    });

    expect(fillField).toHaveBeenCalledWith(fullness, size[0], size[1]);
  });

  it("cell click action", () => {
    const coords = {
      x: 2,
      y: 4,
    };

    const actRetVal = {
      type: actionTypes.CELL_CLICK,
      payload: coords,
    };

    const action = actCreators.cellClick(coords);
    expect(baseState.golField[4][2]).toBe(false);
    const result = reducer(baseState, action);

    expect(action).toEqual(actRetVal);
    expect(result.golField[4][2]).toBe(true);
  });

  it("update interval action test", () => {
    const action = actCreators.updateInterval(500);
    const result = reducer(baseState, action);
    const expRes = 500;

    expect(result.gameStatus.interval).toBe(expRes);
  });

  it("increment generation action", () => {
    const action = actCreators.incGen();
    const result = reducer(baseState, action);
    const expRes = 1;

    expect(result.gameStatus.generation).toBe(expRes);
  });
});
