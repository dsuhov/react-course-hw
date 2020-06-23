import { gameFieldSlice } from "./gameFieldSlice";
import { configureStore } from "@reduxjs/toolkit";

import { fillField } from "@/utils/fillField";

jest.mock("@/utils/fillField", () => ({
  fillField: jest.fn(),
}));

function setupStore(preState: FieldScheme) {
  return configureStore({
    reducer: gameFieldSlice.reducer,
    preloadedState: preState,
  });
}

describe("gameFieldSlice test", () => {
  const actions = gameFieldSlice.actions;

  const baseGolField = [
    [false, false, false, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, true, false, false],
    [false, false, false, false, false],
  ];

  it("test fill field", () => {
    const store = setupStore(baseGolField);

    const actionPayload = {
      fullness: 25,
      size: [12, 15],
    };

    (fillField as jest.Mock).mockReturnValue([[true]]);

    store.dispatch(actions.fillFieldAct(actionPayload));

    expect(store.getState()).toEqual([[true]]);
  });

  it("update game state", () => {
    const store = setupStore(baseGolField);

    const expRes =
      [
        [false, false, false, false, false] as const,
        [false, false, false, false, false] as const,
        [false, true, true, true, false] as const,
        [false, false, false, false, false] as const,
        [false, false, false, false, false] as const,
      ] as const;

    store.dispatch(actions.updateField());

    expect(store.getState()).toEqual(expRes);
  });

  it("clear field", () => {
    const baseState = [[true, false], [false, true]];
    const resultState = [[false, false], [false, false]];

    const store = setupStore(baseState);

    store.dispatch(actions.clearField());

    expect(store.getState()).toEqual(resultState);
  });

  it("cell click action test", () => {
    const baseState = [[true, false], [false, true]];
    const resultState = [[true, false], [false, false]];

    const store = setupStore(baseState);

    store.dispatch(actions.cellClick({ x: 1, y: 1 }));

    expect(store.getState()).toEqual(resultState);
  });
});