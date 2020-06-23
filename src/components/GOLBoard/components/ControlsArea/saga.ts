import { put, takeEvery, call } from "redux-saga/effects";
import { gameFieldActions } from "@/rdx/gameField/gameFieldSlice";
import { gameStatusActions } from "@/rdx/gameStatus/gameStatusSlice";

function* UpdField() {
  yield put(gameStatusActions.incGen());
}

export function* watchUpdateField() {
  yield takeEvery(gameFieldActions.updateField.type, UpdField);
}