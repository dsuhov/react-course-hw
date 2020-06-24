import { createReducer } from "@reduxjs/toolkit";
import * as actions from "./actions";
import { AFState } from "./types";

const defaultState = {
  isFetching: false,
  error: null,
  data: {},
};

// Reducer
// intend immer state transformations
export const reducer = createReducer<AFState>(defaultState, {
  [actions.requestStart.type]: (state) => {
    state.isFetching = true;
  },
  [actions.requestFailure.type]: (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
  },
  [actions.requestSuccess.type]: (state, action) => {
    state.isFetching = false;
    state.data = action.payload;
  },
});
