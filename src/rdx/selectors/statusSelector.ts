import { createSelector } from "reselect";
import { RootState } from "@/rdx/store";

// practice in selectors
export const statusSelector = createSelector<
  RootState,
  FieldScheme,
  StatusState,
  GOLStatus
>(
  (state) => state.gameField,
  (state) => state.gameStatus,
  (field, status) => {
    const statusObj: GOLStatus = {
      size: [field[0].length, field.length],
      interval: status.interval,
      generation: status.generation,
    };

    return statusObj;
  }
);
