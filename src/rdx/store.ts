import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { gameFieldSlice } from "@/rdx/gameField/gameFieldSlice";
import { gameStatusSlice } from "@/rdx/gameStatus/gameStatusSlice";
import { watchUpdateField } from "@/components";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    gameField: gameFieldSlice.reducer,
    gameStatus: gameStatusSlice.reducer,
  },
  middleware: [sagaMiddleware],
});

sagaMiddleware.run(watchUpdateField);

export type RootState = ReturnType<typeof store.getState>;
