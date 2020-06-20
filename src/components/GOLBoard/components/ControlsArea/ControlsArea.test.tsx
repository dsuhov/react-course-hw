import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { ControlsArea } from "./ControlsArea";
import renderer from "react-test-renderer";

import { defultStatusState, gameStatusActions } from "@/rdx/gameStatus/gameStatusSlice";
import { initialState, gameFieldActions } from "@/rdx/gameField/gameFieldSlice";

import { Provider } from "react-redux";

import configureStore from "redux-mock-store";
import { Ticker } from "./Ticker";

const baseInterval = defultStatusState.interval;

const mocksetSpeed = jest.fn();
const mockgetSpeed = jest.fn(() => baseInterval);
const mockstart = jest.fn();
const mockstop = jest.fn();
const mocksetFaster = jest.fn();
const mocksetSlower = jest.fn();

jest.mock("./Ticker.ts", () => {
  return {
    Ticker: jest.fn().mockImplementation((clb) => {
      return {
        setSpeed: mocksetSpeed,
        stop: mockstop,
        getSpeed: mockgetSpeed,
        setFaster: mocksetFaster,
        setSlower: mocksetSlower,
        start: () => {
          clb();
          mockstart();
        },
      }
    })
  }
});

const mockStore = configureStore([]);

function setupStore(preStateStatus: StatusState = defultStatusState, preStateField: FieldScheme = initialState) {
  return  mockStore(Object.assign({}, { gameField: preStateField }, { gameStatus: preStateStatus }));
}

describe("<ControlsArea /> tests", () => {
  beforeEach(() => {
    (Ticker as jest.Mock).mockClear();
    mocksetSpeed.mockClear();
    mockgetSpeed.mockClear();
    mockstart.mockClear();
    mockstop.mockClear();
    mocksetFaster.mockClear();
    mocksetSlower.mockClear();
  });

  it("Snapshot for <ControlsArea />", () => {
    const store = setupStore();

    expect(
      renderer
        .create(
          <Provider store={store}>
            <ControlsArea />
          </Provider>
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it("Game initialized, status shoud be stopped, some buttons disabled", () => {
    const store = setupStore();
    const btns = ["faster", "slower", "pause", "reset"];
    
    const area = mount(
      <Provider store={store}>
        <ControlsArea />
      </Provider>
    );

    btns.forEach((btn) => {
      const btnWrapper = area.find(`button[name="${btn}"]`);

      expect(btnWrapper.prop("disabled")).toBeTruthy();
    });

    expect(area.find(`button[name="start"]`).prop("disabled")).toBeFalsy();
  });

  it("game started, check disabled buttons", () => {
    const store = setupStore({
      status: "running",
      interval: 200,
      generation: 0,
    });
    const btns = ["faster", "slower", "pause"];
    const disbldBtns = ["reset", "start"];
    
    const area = mount(
      <Provider store={store}>
        <ControlsArea />
      </Provider>
    );

    btns.forEach((btn) => {
      const btnWrapper = area.find(`button[name="${btn}"]`);

      expect(btnWrapper.prop("disabled")).toBeFalsy();
    });

    disbldBtns.forEach((btn) => {
      const btnWrapper = area.find(`button[name="${btn}"]`);

      expect(btnWrapper.prop("disabled")).toBeTruthy();
    });
  })

  it("game paused, check disabled btns", () => {
    const store = setupStore({
      status: "paused",
      interval: 200,
      generation: 0,
    });

    const btns = ["reset", "resume"];
    const disbldBtns = ["start", "faster", "slower"];
    
    const area = mount(
      <Provider store={store}>
        <ControlsArea />
      </Provider>
    );

    btns.forEach((btn) => {
      const btnWrapper = area.find(`button[name="${btn}"]`);

      expect(btnWrapper.prop("disabled")).toBeFalsy();
    });

    disbldBtns.forEach((btn) => {
      const btnWrapper = area.find(`button[name="${btn}"]`);

      expect(btnWrapper.prop("disabled")).toBeTruthy();
    });
  });

  it("check dispached actions, start game", () => {
    const store = setupStore();

    const area = mount(
      <Provider store={store}>
        <ControlsArea />
      </Provider>
    );

    const initData = {
      fullness: 0,
      size: [0, 0],
    };

    const status = "running";


    area.find("button[name=\"start\"]").simulate("submit");

    expect(store.getActions()).toEqual([
      gameFieldActions.fillFieldAct(initData),
      gameStatusActions.updateStatus(status),
      gameFieldActions.updateField(),
      gameStatusActions.incGen()
    ]);

    expect(mocksetSpeed).toHaveBeenCalledTimes(1);
    expect(mockstart).toHaveBeenCalledTimes(1);
  });

  it("check dispached actions, running game, speed change and pause", () => {
    const store = setupStore({
      status: "running",
      interval: baseInterval,
      generation: 0,
    });

    const area = mount(
      <Provider store={store}>
        <ControlsArea />
      </Provider>
    );

      area.find("button[name=\"faster\"]").simulate("click");
      area.find("button[name=\"slower\"]").simulate("click");
      area.find("button[name=\"pause\"]").simulate("click");

      expect(store.getActions()).toEqual([
        gameStatusActions.updateInterval(baseInterval),
        gameStatusActions.updateInterval(baseInterval),
        gameStatusActions.updateStatus("paused"),
      ]);
      
      expect(mocksetFaster).toHaveBeenCalledTimes(1);
      expect(mocksetSlower).toHaveBeenCalledTimes(1);
      expect(mockstop).toHaveBeenCalledTimes(1);
  });

  it("game paused, resume", () => {
    const store = setupStore({
      status: "paused",
      interval: baseInterval,
      generation: 0,
    });

    const area = mount(
      <Provider store={store}>
        <ControlsArea />
      </Provider>
    );

    area.find("button[name=\"resume\"]").simulate("click");

    expect(mockstart).toHaveBeenCalledTimes(1);

    expect(store.getActions()).toEqual([
      gameFieldActions.updateField(),
      gameStatusActions.incGen(),
      gameStatusActions.updateStatus("running"),
    ]);
  });

  it("game paused, reset", () => {
    const store = setupStore({
      status: "paused",
      interval: baseInterval,
      generation: 0,
    });

    const area = mount(
      <Provider store={store}>
        <ControlsArea />
      </Provider>
    );

    area.find("button[name=\"reset\"]").simulate("click");

    expect(mockstop).toHaveBeenCalledTimes(1);

    expect(store.getActions()).toEqual([
      gameFieldActions.clearField(),
      gameStatusActions.updateStatus("stopped"),
    ]);
  });
});
