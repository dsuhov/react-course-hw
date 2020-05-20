import React from "react";
import renderer from "react-test-renderer";
import { StatusLine } from "./StatusLine";

describe("<StatusLine />  tests", () => {
  const defaultParams: {
    size: [number, number];
    interval: number;
  } = {
    size: [25, 31],
    interval: 548,
  };

  it("<StatusLine /> snapshot", () => {
    expect(
      renderer.create(<StatusLine {...defaultParams} />).toJSON()
    ).toMatchSnapshot();
  });
});
