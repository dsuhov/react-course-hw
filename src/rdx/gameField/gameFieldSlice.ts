import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearField } from "@/utils/clearField";
import { getUpdatedField } from "@/utils/getUpdatedField";
import { fillField } from "@/utils/fillField";

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

export const initialState: FieldScheme = clearField([10, 10]);

export const gameFieldSlice = createSlice({
  name: "gameField",
  initialState,
  reducers: {
    updateField: (state) => getUpdatedField(state),
    clearField: (state) => clearField([state[0].length, state.length]),
    fillFieldAct: (_, { payload }: PayloadAction<ClrFieldAct>) => {
      return fillField(payload.fullness, payload.size[0], payload.size[1]);
    },
    cellClick: (state, { payload }: PayloadAction<CellCorrds>) =>
      getFieldCellClick(state, payload),
  },
});

export const gameFieldActions = gameFieldSlice.actions;
