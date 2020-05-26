import { fillField } from "./fillField";

it("fillField test", () => {
  const x = 10;
  const y = 12;
  const fullness = 28;

  const filledField = fillField(fullness, x, y);
  const filledCells = filledField.reduce((accum, current) => {
    return (accum += current.filter((el) => (el ? 1 : 0)).length);
  }, 0);

  const rate = (filledCells / (x * y)) * 100;

  expect(filledField.length).toBe(y);
  expect(filledField[0].length).toBe(x);
  expect(rate).toBeCloseTo(fullness, 0);
});
