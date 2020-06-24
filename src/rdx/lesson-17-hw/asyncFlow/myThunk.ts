import { Dispatch } from "@reduxjs/toolkit";
import * as actions from "./actions";

const url = "https://swapi.dev/api/people";

// Thunk
export const getSwapiData = () => (dispatch: Dispatch) => {
  dispatch(actions.requestStart());

  return fetch(url)
    .then((response) => response.json())
    .then((data) => dispatch(actions.requestSuccess(data)))
    .catch((err) => dispatch(actions.requestFailure(err.message)));
};
