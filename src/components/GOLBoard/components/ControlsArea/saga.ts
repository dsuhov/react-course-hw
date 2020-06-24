import { put, takeEvery } from "redux-saga/effects";
import { gameFieldActions } from "@/rdx/gameField/gameFieldSlice";
import { gameStatusActions } from "@/rdx/gameStatus/gameStatusSlice";

export function* incGeneration() {
  yield put(gameStatusActions.incGen());
}

export function* watchUpdateField() {
  yield takeEvery(gameFieldActions.updateField.type, incGeneration);
}
