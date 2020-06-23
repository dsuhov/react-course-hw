import { expectSaga } from "redux-saga-test-plan";
import { gameStatusSlice } from "@/rdx/gameStatus/gameStatusSlice";
import { gameFieldSlice } from "@/rdx/gameField/gameFieldSlice";
import { watchUpdateField } from "./saga";
import { takeEvery } from "redux-saga/effects";
import { put } from "redux-saga-test-plan/matchers";

const { reducer } = gameStatusSlice;
const { updateField } = gameFieldSlice.actions;

describe("Controls Area saga test", ()=> {
  it("watch inc gen", () => {
    // expectSaga(watchUpdateField)
    //   .take(takeEvery(updateField()));
  });
});