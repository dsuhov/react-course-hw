import { isNumber, isFunction } from "./helpers";

describe("Helpers tests", () => {
  it("78", () => {
    expect(isNumber("78")).toBe(true);
  });

  it("!78", () => {
    expect(isNumber("!78")).toBe(false);
  });

  it("!78", () => {
    expect(isFunction("!78")).toBe(true);
  });

  it("89", () => {
    expect(isFunction("89")).toBe(false);
  });
})