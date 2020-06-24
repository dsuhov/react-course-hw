import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { gameFieldSlice } from "@/rdx/gameField/gameFieldSlice";
import { gameStatusSlice } from "@/rdx/gameStatus/gameStatusSlice";
import { watchUpdateField } from "@/components";
import { myThunkMiddleware } from "@/rdx/lesson-17-hw/thunk";
import { reducer as myThunkReducer } from "@/rdx/lesson-17-hw/asyncFlow/reducer";
import { probablity } from "@/rdx/lesson-17-hw/probability";

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    gameField: gameFieldSlice.reducer,
    gameStatus: gameStatusSlice.reducer,
    myThunkReducer,
  },
  middleware: [sagaMiddleware, myThunkMiddleware, probablity],
});

sagaMiddleware.run(watchUpdateField);

export type RootState = ReturnType<typeof store.getState>;
