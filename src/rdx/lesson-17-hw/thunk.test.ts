import { myThunkMiddleware } from "./thunk";
import { createAction, ThunkAction } from "@reduxjs/toolkit";

describe("myThunkMiddleware test", () => {
  const sampleAction = createAction("DO_SMTH");

  type MyThunkAction = ThunkAction<void, any, any, any>;

  const sampleFuncAction = (): MyThunkAction => {
    return (dispatch) => {
      return dispatch(sampleAction());
    };
  };

  const mockLog = jest.fn();
  const mockDispatch = jest.fn();
  const mockNext = jest.fn();
  window.console.log = mockLog;

  afterEach(() => {
    mockDispatch.mockClear();
    mockNext.mockClear();
    mockLog.mockClear();
  });

  it("test simple thunk middleware, function action", () => {
    const preparedMiddleware = myThunkMiddleware({ dispatch: mockDispatch } as
      any)(mockNext);
    preparedMiddleware(sampleFuncAction());

    expect(mockDispatch).toBeCalledWith(sampleAction());
    expect(mockNext).toBeCalledTimes(0);
  });

  it("test simple thunk middleware, plain action", () => {
    const preparedMiddleware = myThunkMiddleware({ dispatch: mockDispatch } as
      any)(mockNext);
    preparedMiddleware(sampleAction());

    expect(mockDispatch).toBeCalledTimes(0);
    expect(mockNext).toBeCalledWith(sampleAction());
  });
});
