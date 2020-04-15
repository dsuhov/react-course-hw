import { calcStack } from "./calcStack";

test("Calculate ['3', '+', '4', '*', '5', '-', '6']", () => {
  expect(calcStack(["3", "4", "5", "*", "+", "6", "-"])).toBe(17);
});