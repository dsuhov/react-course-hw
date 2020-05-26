import React from "react";
import { mount } from "enzyme";
import { ControlsArea } from "./ControlsArea";
import renderer from "react-test-renderer";

describe("<ControlsArea /> tests", () => {
  it("Snapshot for <ControlsArea />", () => {
    expect(
      renderer
        .create(
          <ControlsArea
            status="running"
            cmdBtnHandler={jest.fn()}
            cmdFormHandler={jest.fn()}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it("Check control buttons functionality, game running", () => {
    const btns = ["faster", "slower", "pause"];
    const cmdBtnHandler = jest.fn();

    const area = mount(
      <ControlsArea
        status="running"
        cmdBtnHandler={cmdBtnHandler}
        cmdFormHandler={jest.fn()}
      />
    );

    btns.forEach((btn) => {
      area.find(`button[name="${btn}"]`).simulate("click");
    });

    expect(cmdBtnHandler).toHaveBeenCalledTimes(btns.length);

    btns.forEach((btn, i) => {
      expect(cmdBtnHandler.mock.calls[i][0]).toBe(btn);
    });

    expect(
      area.find(`button[name="${"reset"}"]`).prop("disabled")
    ).toBeTruthy();
  });

  it("Check control buttons functionality, game paused", () => {
    const cmdBtnHandler = jest.fn();

    const area = mount(
      <ControlsArea
        status="paused"
        cmdBtnHandler={cmdBtnHandler}
        cmdFormHandler={jest.fn()}
      />
    );

    ["faster", "slower"].forEach((btn) => {
      expect(area.find(`button[name="${btn}"]`).prop("disabled")).toBeTruthy();
    });

    area.find(`button[name="reset"]`).simulate("click");
    expect(cmdBtnHandler.mock.calls[0][0]).toBe("reset");
  });

  it("Check control buttons functionality, game stopped", () => {
    const btns = ["faster", "slower", "pause", "reset"];

    const area = mount(
      <ControlsArea
        status="stopped"
        cmdBtnHandler={jest.fn()}
        cmdFormHandler={jest.fn()}
      />
    );

    btns.forEach((btn) => {
      expect(area.find(`button[name="${btn}"]`).prop("disabled")).toBeTruthy();
    });
  });
});
