import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import { DrawField } from "./DrawField";
import { Cell } from "./components";

function newTestScheme(
  xSize: number,
  ySize: number,
  value: boolean
): boolean[][] {
  return (
    Array.from({ length: ySize }).map(() =>
      Array.from({ length: xSize }).fill(value)
    ) as boolean[][]
  );
}

describe("Field that draw cells", () => {
  // const emptyFieldScheme = newTestScheme(4, 5, false);
  // const fullFieldScheme = newTestScheme(4, 5, true);

  // it("reders full empty field", () => {
  //   expect(renderer.create(<DrawField />).toJSON()).toMatchSnapshot();
  // });

  // it("reders full alive field", () => {
  //   expect(renderer.create(<DrawField />).toJSON()).toMatchSnapshot();
  // });

  // it("renders empty field 4x5", () => {
  //   const field = mount(<DrawField />);

  //   const fieldSize = emptyFieldScheme[0].length * emptyFieldScheme.length;

  //   expect(
  //     field.findWhere((el) => el.is(Cell) && el.props().isAlive === false)
  //       .length
  //   ).toBe(fieldSize);
  // });

  // it("renders full field 4x5", () => {
  //   const field = mount(<DrawField />);

  //   const fieldSize = fullFieldScheme[0].length * fullFieldScheme.length;

  //   expect(
  //     field.findWhere((el) => el.is(Cell) && el.props().isAlive === true).length
  //   ).toBe(fieldSize);
  // });

  // it("renders partial filled field, size 3*4", () => {
  //   const partialFilledField = [
  //     [false, true, true, true],
  //     [true, false, false, false],
  //     [true, true, false, true],
  //     [false, true, false, true],
  //   ];

  //   const [aliveCells, deadCells] = partialFilledField.reduce(
  //     (result, current) => {
  //       return [
  //         result[0] + current.filter((el) => el === true).length,
  //         result[1] + current.filter((el) => el === false).length,
  //       ];
  //     },
  //     [0, 0]
  //   );

  //   const field = mount(<DrawField />);

  //   expect(
  //     field.findWhere((el) => el.is(Cell) && el.props().isAlive === false)
  //       .length
  //   ).toBe(deadCells);

  //   expect(
  //     field.findWhere((el) => el.is(Cell) && el.props().isAlive === true).length
  //   ).toBe(aliveCells);

  //   expect(
  //     field.findWhere((el) => el.is(Cell) && el.props().isAlive === true).length
  //   ).not.toBe(1);
  // });
});
