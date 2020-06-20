import React from "react";
import { GameScreen } from "./GameScreen";
import { mount } from "enzyme";
import { readLogin, isLoggedIn } from "@/api/auth";
import { sleep } from "@/utils/sleep";
import { act } from "react-dom/test-utils";
import { store } from "@/rdx/store";
import { Provider } from "react-redux";

const mockHistory = { replace: jest.fn() };
jest.mock("react-router-dom", () => ({
  useHistory: () => mockHistory,
}));

jest.mock("@/api/auth", () => ({
  isLoggedIn: jest.fn(),
  logout: jest.fn(),
  readLogin: jest.fn(),
}));

describe("GameScreen", () => {
  it("Redirect on logout", async () => {
    (isLoggedIn as jest.Mock).mockResolvedValue(true);
    (readLogin as jest.Mock).mockImplementation(() => "Bob");
    const screen = mount(
      <Provider store={store}>
        <GameScreen />
      </Provider>
    );

    await act(async () => {
      await sleep(10);
      screen.update();

      screen.find("LogoutBtn").simulate("click");

      await sleep(10);
      screen.update();
    });

    const name = screen.find("HelloLine span");
    expect(name.html()).toMatchInlineSnapshot(`"<span>Bob</span>"`);
    expect(mockHistory.replace).toHaveBeenCalledWith(`/`);
  });
});
