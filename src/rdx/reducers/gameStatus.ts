import * as actionTypes from "@/rdx/actions/actionTypes";
import { StatusActions } from "@/rdx/actions/actions";

const defultStatusState: StatusState = {
  status: "stopped",
  interval: 200,
  generation: 0,
};

export const gameStatus = (
  state: StatusState = defultStatusState,
  action: StatusActions
): StatusState => {
  switch (action.type) {
    case actionTypes.UPDATE_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case actionTypes.UPDATE_INTERVAL:
      return {
        ...state,
        interval: action.interval,
      };
    case actionTypes.INC_GEN:
      return {
        ...state,
        generation: state.generation + 1,
      };
  }

  return state;
};
