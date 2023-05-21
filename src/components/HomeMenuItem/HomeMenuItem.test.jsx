/* eslint-disable no-undef */
import { fireEvent, render } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";
import ShallowRenderer from "react-shallow-renderer";
import HomeMenuItem from "./HomeMenuItem";

describe("HomeMenuItem Component", () =>
  test("HomeMenuItem action", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const { container } = render(
      <Router location={history.location} navigator={history}>
        <HomeMenuItem to="/lpn-date-check" label="test" description="test" />
      </Router>
    );
    expect(history.location.pathname).toBe("/");
    const button = container.getElementsByTagName("button")[0];
    fireEvent.click(button);
    expect(history.location.pathname).toBe("/lpn-date-check");
  }));

describe("HomeMenuItem Component", () =>
  test("HomeMenuItem snapshot", () => {
    const renderer = new ShallowRenderer();
    const history = createMemoryHistory({ initialEntries: ["/lpn-date-check"] });
    renderer.render(
      <Router location={{ ...history.location, key: "1" }}>
        <HomeMenuItem to="/lpn-date-check" label="test" description="test" />
      </Router>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));
