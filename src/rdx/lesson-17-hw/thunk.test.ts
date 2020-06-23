import { myThunkMiddleware } from "./thunk";
import {
  createAction,
  ThunkAction,
} from "@reduxjs/toolkit";

describe("myThunkMiddleware test", () => {

  const sampleAction = createAction("DO_SMTH");

  type MyThunkAction = ThunkAction<void, any, any, any>;

  const sampleFuncAction = (): MyThunkAction => {
    return (dispatch) => {
      dispatch(sampleAction());
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
    const preparedMiddleware = myThunkMiddleware({ dispatch: mockDispatch } as any)(mockNext);
    preparedMiddleware(sampleFuncAction());

    expect(mockLog).toBeCalledTimes(1);
    expect(mockDispatch).toBeCalledTimes(1);
    expect(mockNext).toBeCalledTimes(1);
    
  });

  it("test simple thunk middleware, plain action", () => {
    const preparedMiddleware = myThunkMiddleware({ dispatch: mockDispatch } as any)(mockNext);
    preparedMiddleware(sampleAction());

    expect(mockLog).toBeCalledTimes(0);
    expect(mockDispatch).toBeCalledTimes(0);
    expect(mockNext).toBeCalledTimes(1);
  });

});