import { golField } from "./golField";
import { gameStatus } from "./gameStatus";
import { combineReducers } from "redux";

export const reducer = combineReducers({
  golField,
  gameStatus,
});
