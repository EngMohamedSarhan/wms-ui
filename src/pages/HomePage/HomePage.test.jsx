/* eslint-disable no-undef */
import React from "react";
import HomePage from "./HomePage";
import { act } from "react-dom/test-utils";
import { within } from "@testing-library/dom";

import ShallowRenderer from "react-shallow-renderer";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { Provider } from "react-redux";
import { persistor, store } from "../../redux/store";
import { BrowserRouter } from "react-router-dom";
import { FormControl, Grid, MenuItem, Select } from "@mui/material";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "../../utilities/constants/axios";
import dummyApplications from "../../utilities/testing/dummy-data/applications";
import dummyLPNRows from "../../utilities/testing/dummy-data/lpn-rows";

const mock = new MockAdapter(axios, { onNoMatch: "throwException" });

beforeEach(() => {
  mock.reset();

  mock.onPost("/lpndatecheck/save-all").reply(function (config) {
    let data = JSON.parse(config.data);
    let req = data.lpnMultiAdjustRequest;
    let arr = [];
    for (let element of req) {
      arr.push({
        sourceContainerId: element.sourceContainerId,
        statusMessage: "LPN Date Update Successful.",
        isSuccess: true,
      });
    }
    return [
      200,
      {
        lpnSingleAdjustResponse: arr,
        requestLevelStatusMessage: "LPN Date Update Successful.",
        isSuccess: true,
      },
    ];
  });

  mock.onPost("/lpndatecheck/save-single-item").reply(function (config) {
    let data = JSON.parse(config.data);
    let req = data.lpnSingleAdjustRequest;
    let sourceId = req.sourceContainerId;
    let response = {
      sourceContainerId: sourceId,
      statusMessage: "LPN Date Update Successful.",
      isSuccess: true,
    };
    return [200, response];
  });

  mock.onGet("/lookup/warehouse-locations").reply(200, [
    { warehouseId: 1, warehouseShortName: "ATL" },
    { warehouseId: 2, warehouseShortName: "DEN" },
    { warehouseId: 3, warehouseShortName: "LAF" },
    { warehouseId: 4, warehouseShortName: "ABQ" },
    { warehouseId: 5, warehouseShortName: "ASH" },
    { warehouseId: 6, warehouseShortName: "DFB" },
    { warehouseId: 7, warehouseShortName: "LUB" },
    { warehouseId: 8, warehouseShortName: "NEW" },
    { warehouseId: 9, warehouseShortName: "OKL" },
    { warehouseId: 10, warehouseShortName: "COL" },
    { warehouseId: 11, warehouseShortName: "OMA" },
  ]);

  mock.onGet(new RegExp(".*/lpndatecheck/.*")).reply(200, dummyLPNRows);
  mock.onGet(new RegExp(".*/lookup/applications")).reply(200, dummyApplications);
});

afterAll(() => {
  mock.restore();
});
afterEach(cleanup);

describe("HomePageComponent", () =>
  test("HomePage snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        <HomePage></HomePage>
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

describe("HomePage Component Interactive", () =>
  test("HomePage Component Interactive", () => {
    const { getByText, getAllByText, getAllByTestId, unmount } = render(
      <Provider store={store}>
        <BrowserRouter>
          <HomePage></HomePage>
        </BrowserRouter>
      </Provider>
    );

    const sortItem = getByText("Sort");
    act(() => {
    fireEvent.mouseDown(sortItem);
    });
    const sortDescItem = getByText("Sort by name descending");
    act(() => {
      userEvent.click(sortDescItem);
    });

    const firstItem = getAllByText("View and Manage")[0];
    const secondItem = getAllByText("View and Manage")[1];
    expect(
      within(getAllByTestId("home-menu-item")[0]).getByText("Task Group Eligibility")
    );

    unmount();
  }));
