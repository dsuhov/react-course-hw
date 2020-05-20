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
            cmdBtnHadler={jest.fn()}
            cmdFormHandler={jest.fn()}
          />
        )
        .toJSON()
    ).toMatchSnapshot();
  });

  it("Check control buttons functionality, game running", () => {
    const btns = ["faster", "slower", "pause"];
    const cmdBtnHadler = jest.fn((evt) => evt.target.name);

    const area = mount(
      <ControlsArea
        status="running"
        cmdBtnHadler={cmdBtnHadler}
        cmdFormHandler={jest.fn()}
      />
    );

    btns.forEach((btn) => {
      area.find(`button[name="${btn}"]`).simulate("click");
    });

    expect(cmdBtnHadler.mock.calls.length).toBe(btns.length);

    btns.forEach((btn, i) => {
      expect(cmdBtnHadler.mock.results[i].value).toBe(btn);
    });

    expect(area.find(`button[name="${"reset"}"]`).getDOMNode()).toHaveProperty(
      "disabled"
    );
  });

  it("Check control buttons functionality, game paused", () => {
    const btns = ["faster", "slower", "resume"];
    const cmdBtnHadler = jest.fn((evt) => evt.target.name);

    const area = mount(
      <ControlsArea
        status="paused"
        cmdBtnHadler={cmdBtnHadler}
        cmdFormHandler={jest.fn()}
      />
    );

    btns.forEach((btn) => {
      expect(area.find(`button[name="${btn}"]`).getDOMNode()).toHaveProperty(
        "disabled"
      );
    });

    area.find(`button[name="reset"]`).simulate("click");
    expect(cmdBtnHadler.mock.results[0].value).toBe("reset");
  });

  it("Check control buttons functionality, game stopped", () => {
    const btns = ["faster", "slower", "pause", "reset"];

    const area = mount(
      <ControlsArea
        status="stopped"
        cmdBtnHadler={jest.fn()}
        cmdFormHandler={jest.fn()}
      />
    );

    btns.forEach((btn) => {
      expect(area.find(`button[name="${btn}"]`).getDOMNode()).toHaveProperty(
        "disabled"
      );
    });
  });
});
