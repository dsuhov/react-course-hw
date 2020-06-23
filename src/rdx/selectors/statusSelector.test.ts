import { statusSelector } from "@/rdx/selectors/statusSelector";
import { store } from "@/rdx/store";

it("test game status selector", () => {
  const rootState = store.getState();
  const size = [rootState.gameField[0].length, rootState.gameField.length];

  const result = statusSelector(rootState);
  const expRes = {
    size: size,
    interval: rootState.gameStatus.interval,
    generation: rootState.gameStatus.generation,
  };

  expect(result).toEqual(expRes);
});
