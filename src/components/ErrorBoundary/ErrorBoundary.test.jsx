/* eslint-disable no-undef */
import { render } from "@testing-library/react";
import React from "react";
import ErrorBoundary from "./ErrorBoundary";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import ShallowRenderer from "react-shallow-renderer";

describe("ErrorBoundary Component", () => {
  test("ErrorBoundary rendering", () => {
    const ThrowError = () => {
      throw new Error("Error!");
    };
    const { getByTestId } = render(
      <Provider store={store}>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </Provider>
    );

    expect(getByTestId("error-boundary")).toBeInTheDocument();
  });
});

describe("ErrorBoundary Component", () =>
  test("ErrorBoundary snapshot", () => {
    const renderer = new ShallowRenderer();
    const ThrowError = () => {
      throw new Error("Error!");
    };
    renderer.render(
      <Provider store={store}>
        <ErrorBoundary>
          <ThrowError />
        </ErrorBoundary>
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));
