import React from "react";
import { mount } from "enzyme";
import renderer from "react-test-renderer";
import { Provider } from "react-redux";
import configureStore, { MockStoreEnhanced } from "redux-mock-store";
import { Cell, CellProps, RawCell } from "./Cell";
import { gameFieldActions } from "@/rdx/gameField/gameFieldSlice";

const deadCellProps = {
  x: 5,
  y: 5,
  isAlive: false,
  cellClick: jest.fn(),
};

const aliveCellProps = {
  x: 5,
  y: 5,
  isAlive: true,
  cellClick: jest.fn(),
};

const mockStore = configureStore<CellProps>([]);

function getCell<S>(props: typeof deadCellProps, store: MockStoreEnhanced<S>) {
  const comp = mount(
    <Provider store={store}>
      <Cell {...deadCellProps} />
    </Provider>
  );

  return comp;
}

describe("Cell", () => {
  let store: MockStoreEnhanced<CellProps>;

  beforeEach(() => {
    store = mockStore();
  });

  it("renders dead cell", () => {
    expect(
      renderer.create(<RawCell {...deadCellProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it("renders alive cell", () => {
    expect(
      renderer.create(<RawCell {...aliveCellProps} />).toJSON()
    ).toMatchSnapshot();
  });

  it("check dispatch onClick", () => {
    const { x, y } = deadCellProps;

    const wrapper = getCell<CellProps>(deadCellProps, store);

    wrapper.simulate("click");

    expect(store.getActions()[0]).toEqual(gameFieldActions.cellClick({ x, y }));
  });
});
