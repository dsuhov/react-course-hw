import { changeSize } from "./changeSize";

const baseField = [
  [false, false, false, false, false],
  [false, false, true, true, false],
  [false, false, false, true, false],
  [false, true, false, true, false],
  [false, false, false, false, false],
];

const filledCells = (field) => {
  return field.reduce((accum, current) => {
    return (accum += current.filter((el) => (el ? 1 : 0)).length);
  }, 0);
};

describe("Change Size test", () => {
  it("y + 2", () => {
    const result = changeSize(0, 2, baseField);

    expect(result.length).toBe(baseField.length + 2);
    expect(result[0].length).toBe(baseField[0].length);
    expect(filledCells(result)).toBe(filledCells(baseField));
  });

  it("y - 2", () => {
    const result = changeSize(0, -2, baseField);

    expect(result.length).toBe(baseField.length - 2);
    expect(result[0].length).toBe(baseField[0].length);
  });

  it("x + 2", () => {
    const result = changeSize(2, 0, baseField);

    expect(result.length).toBe(baseField.length);
    expect(result[0].length).toBe(baseField[0].length + 2);
  });

  it("x - 2", () => {
    const result = changeSize(-2, 0, baseField);

    expect(result.length).toBe(baseField.length);
    expect(result[0].length).toBe(baseField[0].length - 2);
  });

  it("x + 2, y + 2, save cell status", () => {
    const result = changeSize(2, 2, baseField);

    expect(result.length).toBe(baseField.length + 2);
    expect(result[0].length).toBe(baseField[0].length + 2);
    expect(filledCells(result)).toBe(filledCells(baseField));
  });

  it("x - 2, y - 2", () => {
    const result = changeSize(-2, -2, baseField);

    expect(result.length).toBe(baseField.length - 2);
    expect(result[0].length).toBe(baseField[0].length - 2);
  });
});
