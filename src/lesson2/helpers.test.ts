import { isFunction } from "./helpers";

test("sin", () => {
  expect(isFunction("sin")).toBe(true);
});

test("tan", () => {
  expect(isFunction("tan")).toBe(true);
});

test("tdan", () => {
  expect(isFunction("tdan")).toBe(false);
});
