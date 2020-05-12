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
  const emptyFieldScheme = newTestScheme(4, 5, false);
  const fullFieldScheme = newTestScheme(4, 5, true);

  it("reders full empty field", () => {
    expect(
      renderer
        .create(
          <DrawField
            fieldScheme={emptyFieldScheme}
            cellClickHandler={jest.fn()}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it("reders full alive field", () => {
    expect(
      renderer
        .create(
          <DrawField
            fieldScheme={fullFieldScheme}
            cellClickHandler={jest.fn()}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it("renders some field with sides 4*5", () => {
    const field = mount(
      <DrawField fieldScheme={emptyFieldScheme} cellClickHandler={jest.fn()} />
    );

    expect(
      field.findWhere((el) => el.is(Cell) && el.props().y === 0).length
    ).toBe(emptyFieldScheme[0].length);

    expect(
      field.findWhere((el) => el.is(Cell) && el.props().x === 0).length
    ).toBe(emptyFieldScheme.length);
  });

  it("renders empty field 4x5", () => {
    const field = mount(
      <DrawField fieldScheme={emptyFieldScheme} cellClickHandler={jest.fn()} />
    );

    const fieldSize = emptyFieldScheme[0].length * emptyFieldScheme.length;

    expect(
      field.findWhere((el) => el.is(Cell) && el.props().isAlive === false)
        .length
    ).toBe(fieldSize);
  });

  it("renders full field 4x5", () => {
    const field = mount(
      <DrawField fieldScheme={fullFieldScheme} cellClickHandler={jest.fn()} />
    );

    const fieldSize = fullFieldScheme[0].length * fullFieldScheme.length;

    expect(
      field.findWhere((el) => el.is(Cell) && el.props().isAlive === true).length
    ).toBe(fieldSize);
  });

  it("renders partial filled field, size 3*4", () => {
    const partialFilledField = [
      [false, true, true, true],
      [true, false, false, false],
      [true, true, false, true],
      [false, true, false, true],
    ];

    const [aliveCells, deadCells] = partialFilledField.reduce(
      (result, current) => {
        return [
          result[0] + current.filter((el) => el === true).length,
          result[1] + current.filter((el) => el === false).length,
        ];
      },
      [0, 0]
    );

    const field = mount(
      <DrawField
        fieldScheme={partialFilledField}
        cellClickHandler={jest.fn()}
      />
    );

    expect(
      field.findWhere((el) => el.is(Cell) && el.props().isAlive === false)
        .length
    ).toBe(deadCells);

    expect(
      field.findWhere((el) => el.is(Cell) && el.props().isAlive === true).length
    ).toBe(aliveCells);

    expect(
      field.findWhere((el) => el.is(Cell) && el.props().isAlive === true).length
    ).not.toBe(1);
  });

  it("renders field 2*2, click handler called with args", () => {
    const fieldScheme = [
      [true, false],
      [false, true],
    ];

    const onClick = jest.fn();

    const field = mount(
      <DrawField fieldScheme={fieldScheme} cellClickHandler={onClick} />
    );

    field
      .findWhere(
        (el) => el.is(Cell) && el.props().x === 1 && el.props().y === 0
      )
      .simulate("click");

    expect(onClick).toHaveBeenCalledWith(1, 0);
  });
});
