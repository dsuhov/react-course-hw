import { Action } from "redux";
import { clearField } from "@/utils/clearField";
import { getUpdatedField } from "@/utils/getUpdatedField";
import { fillField } from "@/utils/fillField";
import * as actionTypes from "@/rdx/actions/actionTypes";

const defaultFieldScheme: FieldScheme = clearField([10, 10]);

const getFieldCellClick = (
  state: FieldScheme,
  coords: CellCorrds
): FieldScheme => {
  const { x, y } = coords;
  const isXValid = x >= 0 && x < state[0].length;
  const isYValid = y >= 0 && y < state.length;
  const areCoordinatesValid = isXValid && isYValid;
  if (!areCoordinatesValid) {
    return state;
  }

  const newField = state.map((row) => [...row]);
  newField[y][x] = !state[y][x];

  return newField;
};

export const golField = (
  state: FieldScheme = defaultFieldScheme,
  action: Action & { payload?: any }
): FieldScheme => {
  switch (action.type) {
    case actionTypes.UPDATE_FIELD:
      return getUpdatedField(state);
    case actionTypes.CLEAR_FIELD:
      return clearField([state[0].length, state.length]);
    case actionTypes.FILL_FIELD:
      return fillField(
        action.payload.fullness,
        action.payload.size[0],
        action.payload.size[1]
      );
    case actionTypes.CELL_CLICK:
      return getFieldCellClick(state, action.payload);
  }

  return state;
};
