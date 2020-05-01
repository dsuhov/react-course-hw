import React from "react";
import EntryCard from "./EntryCard";
import { shallow } from "enzyme";
import type { EntryCardProps } from "./interfaces";

const defaultValues: EntryCardProps = {
  definition: "Pan",
  meaning: "Сковорода",
  entryClickHandler: jest.fn(),
  id: 42,
};

const defaultValuesWithDisabledNo: EntryCardProps = {
  definition: "Pan",
  meaning: "Сковорода",
  entryClickHandler: jest.fn(),
  disabled: false,
  id: 42,
};

const defaultValuesWithDisabledYes: EntryCardProps = {
  definition: "Pan",
  meaning: "Сковорода",
  entryClickHandler: jest.fn(),
  disabled: true,
  id: 42,
};

describe("Testing Entry Card", () => {
  it("Render one Entry with values, no disabled prop", () => {
    const wrapper = shallow(<EntryCard {...defaultValues} />);
    expect(wrapper.html()).toBe("<dl><dt>Pan</dt><dd>Сковорода</dd></dl>");
  });

  it("Render one Entry with values, disabled false", () => {
    const wrapper = shallow(<EntryCard {...defaultValuesWithDisabledNo} />);
    expect(wrapper.html()).toBe("<dl><dt>Pan</dt><dd>Сковорода</dd></dl>");
  });

  it("Render one Entry with values, disabled true", () => {
    const wrapper = shallow(<EntryCard {...defaultValuesWithDisabledYes} />);
    expect(wrapper.html()).toBe("<h3>Deleted.</h3>");
  });

  it("Check click on Entry", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <EntryCard
        definition="dog"
        meaning="Собака"
        entryClickHandler={onClick}
        id={42}
      />
    );

    wrapper.simulate("click");
    wrapper.simulate("click");
    expect(onClick.mock.calls.length).toBe(2);
  });

  it("Check click on normal Entry with argument", () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <EntryCard
        definition="dog"
        meaning="Собака"
        entryClickHandler={onClick}
        id={42}
      />
    );

    wrapper.simulate("click");
    expect(onClick.mock.calls[0][0]).toBe(true);
  });
});
