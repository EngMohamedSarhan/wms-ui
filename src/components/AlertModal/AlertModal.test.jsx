/* eslint-disable no-undef */
import { ThemeProvider } from "@emotion/react";
import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import ShallowRenderer from "react-shallow-renderer";

import theme from "../../styles/theme";
import AlertModal from "./AlertModal";

describe("AlertModal Component", () =>
  test("AlertModal not rendering", () => {
    const onClose = jest.fn();
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <AlertModal isOpen={false} onClose={onClose} />
      </ThemeProvider>
    );
    const modal = queryByTestId("alert-modal");
    expect(modal).toBeNull();
  }));

describe("AlertModal Component", () =>
  test("AlertModal rendering", () => {
    const onClose = jest.fn();
    const { queryByTestId } = render(
      <ThemeProvider theme={theme}>
        <AlertModal isOpen={true} onClose={onClose} />
      </ThemeProvider>
    );
    const modal = queryByTestId("alert-modal");
    expect(modal).toBeInTheDocument();
  }));

describe("AlertModal Action Component", () =>
  test("AlertModal Action rendering", () => {
    const onClose = jest.fn();
    const onAction = jest.fn();
    const { container } = render(
      <ThemeProvider theme={theme}>
        <AlertModal isOpen={true} onClose={onClose} onAction={onAction} />
      </ThemeProvider>
    );
    const button = screen.queryByText("Ok");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onAction).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  }));

describe("AlertModal Component", () =>
  test("AlertModal snapshot", () => {
    const onClose = jest.fn();
    const renderer = new ShallowRenderer();
    renderer.render(
      <ThemeProvider theme={theme}>
        <AlertModal isOpen={true} onClose={onClose} />
      </ThemeProvider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));
