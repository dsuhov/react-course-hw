import React from "react";
import renderer from "react-test-renderer";
import { StatusLine } from "./StatusLine";
import { useSelector } from "react-redux";
import { RootState } from "@/rdx/store";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("<StatusLine />  tests", () => {
  const fakeState: RootState = {
    gameField: [[]],
    gameStatus: {
      status: "stopped",
      interval: 400,
      generation: 5,
    },
  };

  it("<StatusLine /> snapshot", () => {
    (useSelector as jest.Mock).mockImplementation((callback) => {
      return callback(fakeState);
    });
    expect(renderer.create(<StatusLine />).toJSON()).toMatchSnapshot();
  });
});
