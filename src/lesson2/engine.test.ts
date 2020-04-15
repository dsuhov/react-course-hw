import { doCalculation } from "./engine";

describe("Calculate infix or postfix string", () => {
  test("Calculate 3 + ! 5", () => {
    expect(doCalculation("3 + ! 5")).toBe(123);
  });

  test("Calculate ((10 * (6 / ((9 + 3) * -11))) + 17) + 5", () => {
    expect(
      doCalculation("( ( 10 * ( 6 / ( ( 9 + 3 ) * -11 ) ) ) + 17 ) + 5")
    ).toEqual(21.545454545454547);
  });

  test("Calculate 3 4 2 × 1 5 − 2 3 ^ ^ ÷ +", () => {
    expect(doCalculation("3 4 2 * 1 5 - 2 3 ^ ^ / +")).toEqual(3.0001220703125);
  });

  test("Calculate 8 + ( 10 ** + 2 ) / 4", () => {
    expect(doCalculation("8 + ( 10 ** + 2 ) / 4")).toEqual(33.5);
  });
});
