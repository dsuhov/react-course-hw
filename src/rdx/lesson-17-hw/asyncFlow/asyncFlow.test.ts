import { getSwapiData } from "./myThunk";
import * as actions from "./actions";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "./reducer";

describe("asyncFlow test", () => {
  const fakeData = {
    coune: 82,
    next: "http://swapi.dev/api/people/?page=2",
    results: [{ name: "Luke Skywalker" }],
  };

  let dispatch: jest.Mock;
  let asyncAction: Function;

  beforeEach(() => {
    dispatch = jest.fn();
    asyncAction = getSwapiData();
  });

  it("dispatch REQUEST_START and REQUEST_SUCCESS", async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => ({}),
      })
    ) as jest.Mock;

    await asyncAction(dispatch);

    expect(dispatch.mock.calls).toEqual([
      [actions.requestStart()],
      [actions.requestSuccess({})],
    ]);
  });

  it("dispatch REQUEST_START and REQUEST_SUCCESS", async () => {
    const err = new Error();
    window.fetch = jest.fn(() => Promise.reject(err)) as jest.Mock;

    await asyncAction(dispatch);

    expect(dispatch.mock.calls).toEqual([
      [actions.requestStart()],
      [actions.requestFailure(err)],
    ]);
  });

  it("state on success", async () => {
    window.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => fakeData,
      })
    ) as jest.Mock;

    const store = configureStore({
      reducer,
    });

    await store.dispatch(getSwapiData());

    expect(store.getState()).toEqual({
      isFetching: false,
      error: null,
      data: fakeData,
    });
  });

  it("state on failure", async () => {
    const err = new Error();
    window.fetch = jest.fn(() => Promise.reject("Request failed")) as jest.Mock;

    const store = configureStore({
      reducer,
    });

    await store.dispatch(getSwapiData());

    expect(store.getState()).toEqual({
      isFetching: false,
      error: "Request failed",
      data: {},
    });
  });
});
