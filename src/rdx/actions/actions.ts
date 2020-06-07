import * as actionType from "./actionTypes";

export interface UpdIntAction {
  type: typeof actionType.UPDATE_INTERVAL;
  interval: number;
}

export interface UpdStatusAction {
  type: typeof actionType.UPDATE_STATUS;
  status: GameStatus;
}

export interface IncGenAction {
  type: typeof actionType.INC_GEN;
}

export type StatusActions = UpdIntAction | UpdStatusAction | IncGenAction;

export const incGen = (): IncGenAction => {
  return {
    type: actionType.INC_GEN,
  };
};

export const updateField = () => {
  return {
    type: actionType.UPDATE_FIELD,
  };
};

export const updateStatus = (status: GameStatus): UpdStatusAction => {
  return {
    type: actionType.UPDATE_STATUS,
    status,
  };
};

export const updateInterval = (interval: number): UpdIntAction => {
  return {
    type: actionType.UPDATE_INTERVAL,
    interval: interval,
  };
};

export const clearFieldAct = () => {
  return {
    type: actionType.CLEAR_FIELD,
  };
};

export const fillField = (size: [number, number], fullness: number) => {
  return {
    type: actionType.FILL_FIELD,
    payload: {
      size,
      fullness,
    },
  };
};

export const cellClick = (coords: CellCorrds) => {
  return {
    type: actionType.CELL_CLICK,
    payload: {
      x: coords.x,
      y: coords.y,
    },
  };
};
