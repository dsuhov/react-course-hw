import * as actionType from "./actionTypes";

export const updateField = () => {
  return {
    type: actionType.UPDATE_FIELD,
  };
};

export const updateStatus = (status: string) => {
  return {
    type: actionType.UPDATE_STATUS,
    payload: {
      status: status,
    },
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
