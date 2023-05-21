/* eslint-disable no-undef */
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { render, fireEvent } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import ShallowRenderer from "react-shallow-renderer";
import userEvent from "@testing-library/user-event";

import settingsReducer from "../../redux/reducers/settingsSlice";
import { store } from "../../redux/store";
import NotificationModal from "./NotificationModal";
import { within } from "@testing-library/dom";
import { act } from "react-dom/test-utils";
import en from "../../utilities/json/en.json";
import preview from "jest-preview";

describe("NotificationModal Component", () =>
  test("NotificationModal not rendering", () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <NotificationModal />
      </Provider>
    );
    const modal = queryByTestId("notification-modal");
    expect(modal).toBeNull();
  }));

describe("NotificationModal Component", () =>
  test("NotificationModal rendering depending on isAppLoading", () => {
    const { getByTestId } = render(
      <Provider
        store={configureStore({
          reducer: combineReducers({
            settingsReducer: settingsReducer,
          }),
          preloadedState: {
            settingsReducer: {
              notification: {
                isOpen: true,
                title: "",
                message: null,
              },
            },
          },
        })}
      >
        <NotificationModal />
      </Provider>
    );
    const loader = getByTestId("notification-modal");
    expect(loader).toBeInTheDocument();
  }));

describe("NotificationModal Component", () =>
  test("NotificationModal rendering main message + message objects", async () => {
    const { getByTestId, getByText } = render(
      <Provider
        store={configureStore({
          reducer: combineReducers({
            settingsReducer: settingsReducer,
          }),
          preloadedState: {
            settingsReducer: {
              notification: {
                isOpen: true,
                title: "",
                message: [
                  { isSuccess: true, status: "success", message: "message1" },
                  { isSuccess: true, status: "success", message: "message2" },
                ],
                mainMessage: {
                  isSuccess: true,
                  status: "success",
                  message: "main message1",
                },
              },
            },
          },
        })}
      >
        <NotificationModal />
      </Provider>
    );
    const loader = getByTestId("notification-modal");
    expect(loader).toBeInTheDocument();
    expect(within(loader).getByText("message1")).toBeInTheDocument();
    expect(within(loader).getByText("message2")).toBeInTheDocument();
    expect(within(loader).getByText("main message1")).toBeInTheDocument();
  }));

describe("NotificationModal Component", () =>
  test("NotificationModal rendering main message + message strings", () => {
    const { getByTestId } = render(
      <Provider
        store={configureStore({
          reducer: combineReducers({
            settingsReducer: settingsReducer,
          }),
          preloadedState: {
            settingsReducer: {
              notification: {
                isOpen: true,
                title: "",
                message: "string message",
                mainMessage: "string main message",
              },
            },
          },
        })}
      >
        <NotificationModal />
      </Provider>
    );
    const loader = getByTestId("notification-modal");
    expect(loader).toBeInTheDocument();
    expect(within(loader).getByText("string message")).toBeInTheDocument();
    expect(within(loader).getByText("string main message")).toBeInTheDocument();
  }));

describe("NotificationModal Component", () =>
  test("NotificationModal snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        <NotificationModal />
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));
