import { getUpdatedField } from "./getUpdatedField";

describe("Test getUpdatedField.test", () => {
  it("Blinker case", () => {
    const baseField = [
      [false, false, false, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, true, false, false],
      [false, false, false, false, false],
    ];

    const targetField = [
      [false, false, false, false, false],
      [false, false, false, false, false],
      [false, true, true, true, false],
      [false, false, false, false, false],
      [false, false, false, false, false],
    ];

    expect(getUpdatedField(baseField)).toEqual(targetField);
  });

  it("case Toad", () => {
    const baseField = [
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
      [false, false, true, true, true, false],
      [false, true, true, true, false, false],
      [false, false, false, false, false, false],
      [false, false, false, false, false, false],
    ];

    const targetField = [
      [false, false, false, false, false, false],
      [false, false, false, true, false, false],
      [false, true, false, false, true, false],
      [false, true, false, false, true, false],
      [false, false, true, false, false, false],
      [false, false, false, false, false, false],
    ];

    expect(getUpdatedField(baseField)).toEqual(targetField);
  });
});
