import { gameStatusSlice } from "./gameStatusSlice";
import { configureStore, EnhancedStore } from "@reduxjs/toolkit";

const actions = gameStatusSlice.actions;

describe("gameStatusSlice", () => {
  const baseState: StatusState = {
    status: "stopped",
    interval: 200,
    generation: 0,
  };

  let store: EnhancedStore<StatusState>;

  beforeEach(() => {
    store = configureStore({
      reducer: gameStatusSlice.reducer,
      preloadedState: baseState,
    });
  });

  it("update status test", () => {
    const expRes = "running";

    store.dispatch(actions.updateStatus(expRes));

    expect(store.getState().status).toBe(expRes);
  });

  it("update interval", () => {
    const expRes = 500;

    store.dispatch(actions.updateInterval(expRes));

    expect(store.getState().interval).toBe(expRes);
  });

  it("increment generation", () => {
    const expRes = 3;

    store.dispatch(actions.incGen());
    store.dispatch(actions.incGen());
    store.dispatch(actions.incGen());

    expect(store.getState().generation).toBe(expRes);
  });
});
