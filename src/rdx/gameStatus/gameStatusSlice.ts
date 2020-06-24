import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const defultStatusState: StatusState = {
  status: "stopped",
  interval: 200,
  generation: 0,
};

export const gameStatusSlice = createSlice({
  name: "gameStatus",
  initialState: defultStatusState,
  reducers: {
    updateStatus: (state, { payload }: PayloadAction<GameStatus>) => {
      state.status = payload;
    },
    updateInterval: (state, { payload }: PayloadAction<number>) => {
      state.interval = payload;
    },
    incGen: (state) => {
      state.generation += 1;
    },
  },
});

export const gameStatusActions = gameStatusSlice.actions;
