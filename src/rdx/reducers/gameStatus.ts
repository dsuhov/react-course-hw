import { Action } from "redux";
import * as actionTypes from "@/rdx/actions/actionTypes";

const defultStatusState: StatusState = {
  status: "stopped",
};

export const gameStatus = (
  state: StatusState = defultStatusState,
  action: Action & { payload: { status: string } }
): StatusState => {
  switch (action.type) {
    case actionTypes.UPDATE_STATUS:
      return {
        ...state,
        status: action.payload.status,
      };
  }

  return state;
};
