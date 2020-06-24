import { expectSaga } from "redux-saga-test-plan";
import { gameStatusSlice } from "@/rdx/gameStatus/gameStatusSlice";
import { incrementGeneration } from "./saga";

const { reducer } = gameStatusSlice;
const { incGen } = gameStatusSlice.actions;

describe("Controls Area saga test", () => {
  it("watch inc gen", () => {
    return expectSaga(incrementGeneration)
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
