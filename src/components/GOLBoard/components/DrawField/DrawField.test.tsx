import React from "react";
import { mount, ReactWrapper } from "enzyme";
import renderer from "react-test-renderer";
import { DrawField } from "./DrawField";
import { Cell } from "./components";
import { Provider } from "react-redux";
import { golField as reducer } from "@/rdx/reducers/golField";
import { createStore, Reducer } from "redux";

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

/**
 * Main sense of this test is to check that DrawField component
 * correctly renders correct amount of cells in correct configureation and
 * passes correct data to them.
 */

const setupWrapper = (
  reducer: Reducer<FieldScheme>,
  initState: FieldScheme
): ReactWrapper => {
  const rootState =
    {
      golField: initState,
      gameStatus: { status: "stopped" },
    } as any;

  const newStore = createStore(reducer, rootState);
  const field = mount(
    <Provider store={newStore}>
      <DrawField />
    </Provider>
  );

  return field;
};

describe("Field that draw cells", () => {
  const emptyFieldScheme = newTestScheme(4, 5, false) as FieldScheme;
  const fullFieldScheme = newTestScheme(4, 5, true) as FieldScheme;

  it("reders full empty field", () => {
    const wrapper = setupWrapper(reducer, emptyFieldScheme);
    expect(renderer.create(wrapper.get(0)).toJSON()).toMatchSnapshot();
  });

  it("reders full alive field", () => {
    const wrapper = setupWrapper(reducer, emptyFieldScheme);
    expect(renderer.create(wrapper.get(0)).toJSON()).toMatchSnapshot();
  });

  it("renders empty field 4x5", () => {
    const wrapper = setupWrapper(reducer, emptyFieldScheme);

    const fieldSize = emptyFieldScheme[0].length * emptyFieldScheme.length;

    expect(
      wrapper.findWhere((el) => el.is(Cell) && el.props().isAlive === false)
        .length
    ).toBe(fieldSize);
  });

  it("renders full field 4x5", () => {
    const field = setupWrapper(reducer, fullFieldScheme);

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

    const field = setupWrapper(reducer, partialFilledField);

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
});
