import { expectSaga } from "redux-saga-test-plan";
import { gameStatusSlice } from "@/rdx/gameStatus/gameStatusSlice";
import { gameFieldSlice } from "@/rdx/gameField/gameFieldSlice";
import { incGeneration } from "./saga";
import { takeEvery } from "redux-saga/effects";
import { put } from "redux-saga-test-plan/matchers";

const { reducer } = gameStatusSlice;
const { incGen } = gameStatusSlice.actions;

describe("Controls Area saga test", ()=> {
  it("watch inc gen", () => {
    return expectSaga(incGeneration)
      .withReducer(reducer)
      .put(incGen())
      .hasFinalState({
        status: "stopped",
        interval: 200,
        generation: 1,
      })
      .run();
  });
});