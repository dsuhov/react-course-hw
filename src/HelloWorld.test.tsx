import React from "react";
import { shallow } from "enzyme";

import HelloWorld from "./HelloWorld";

describe("Test with Enzyme", () => {
  it("HelloWorld test", () => {
    expect(
      shallow(<HelloWorld username="Василий" />).matchesElement(
        <h2>Hello World, Василий</h2>
      )
    ).toBe(true);
  });
});
