import React from "react";
import { LoginScreen } from "./LoginScreen";
import { mount } from "enzyme";
import { login, isLoggedIn } from "@/api/auth";
import { sleep } from "@/utils/sleep";
import { act } from "react-dom/test-utils";

const mockHistory = { push: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
  Redirect: function Redirect(props: any) {
    return <div>Redirect: {JSON.stringify(props)}</div>;
  },
}));

jest.mock("@/api/auth", () => ({
  login: jest.fn(),
  isLoggedIn: jest.fn(),
}));

describe("LoginScreen", () => {
  it("navigates to game page if authorized", async () => {
    (isLoggedIn as jest.Mock).mockResolvedValueOnce(true);

    const screen = mount(<LoginScreen />);
    expect(screen.html()).toMatchInlineSnapshot(
      `"<div>Checking if user is authorized</div>"`
    );

    await act(async () => {
      await sleep(10);
    });

    screen.update();

    expect(screen.html()).toMatchInlineSnapshot(
      `"<div>Redirect: {\\"to\\":\\"/game\\"}</div>"`
    );
  });

  it("navigates to game page on submit", async () => {
    (isLoggedIn as jest.Mock).mockResolvedValueOnce(false);

    const name = "Darian";
    const screen = mount(<LoginScreen />);
    expect(screen.html()).toMatchInlineSnapshot(
      `"<div>Checking if user is authorized</div>"`
    );

    await act(async () => {
      await sleep(10);
    });

    screen.update();

    screen.find("input").simulate("change", { target: { value: name } });

    await screen
      .find("form")
      .simulate("submit", { preventDefault: () => null });

    expect(login).toHaveBeenCalledWith(name);
    expect(mockHistory.push).toHaveBeenCalledWith(`/game`);
  });
});
