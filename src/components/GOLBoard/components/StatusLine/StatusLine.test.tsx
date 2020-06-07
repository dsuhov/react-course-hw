import React from "react";
import renderer from "react-test-renderer";
import { StatusLine } from "./StatusLine";
import { useSelector } from "react-redux";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

describe("<StatusLine />  tests", () => {
  const fakeState: GOLState = {
    golField: [[]],
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
