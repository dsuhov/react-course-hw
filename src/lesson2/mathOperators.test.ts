import { plus, minus } from "./mathOperators";

describe("Functions for calculating value", () => {
  it("['5', '8']", () => {
    expect(plus([5, 8])).toBe(13);
  });

  it("['5', '8']", () => {
    expect(minus([5, 8])).toBe(-3);
  });
});
