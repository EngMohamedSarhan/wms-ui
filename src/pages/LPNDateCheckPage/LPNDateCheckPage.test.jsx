/* eslint-disable no-undef */
import ShallowRenderer from "react-shallow-renderer";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { React } from "react";
import { Provider } from "react-redux";
import { store } from "../../redux/store";
import theme from "../../styles/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import LPNDateCheckPage from "./LPNDateCheckPage";
import { act } from "react-dom/test-utils";
import { within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import MockAdapter from "axios-mock-adapter";
import axios from "../../utilities/constants/axios";
import dummyLPNRows from "../../utilities/testing/dummy-data/lpn-rows";
import en from "../../utilities/json/en.json";

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
});

afterAll(() => {
  mock.restore();
});

describe("LPNDateCheckPage Interactive", () =>
  test("LPNDateCheckPage Interactive", async () => {
    Element.prototype.scrollTo = jest.fn();

    const { getAllByTestId, getByTestId, getAllByRole, unmount } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <LPNDateCheckPage></LPNDateCheckPage>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));


    const rows = getAllByRole("checkbox");
    const row0 = rows[0];
    const row1 = rows[1];
    const row3 = rows[3];

    const expDate0 = within(row0).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate1 = within(row1).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate3 = within(row3).getAllByPlaceholderText("mm/dd/yyyy")[1];

    act(() => {
      fireEvent.change(expDate0, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate1, { target: { value: "01/20/2023" } });
    });

    const saveButton = within(row1).getByTestId("SaveOutlinedIcon").parentElement;

    await act(() => {
      userEvent.click(saveButton);
    });

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    expect(mock.history.post.length).toBe(1); // times called

    const notifModal = screen.getAllByTestId("notification-modal")[0];
    expect(notifModal).toBeInTheDocument();
    await act(() => new Promise((r) => setTimeout(r, 200)));
    await act(() => {
      fireEvent.click(within(notifModal).getAllByRole("button")[1]);
    });
    await act(() => new Promise((r) => setTimeout(r, 1000)));

    const saveButton1 = within(row0).getByTestId("SaveOutlinedIcon").parentElement;
    await act(() => {
      userEvent.click(saveButton1);
    });

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise((r) => setTimeout(r, 200)));

    const notifModal1 = screen.getAllByRole("presentation")[0];
    expect(notifModal1).toBeInTheDocument();
    await act(() => {
      fireEvent.click(within(notifModal1).getAllByRole("button")[1]);
    });

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise((r) => setTimeout(r, 1000)));

    const filterInput = getAllByTestId("Filter Input")[0];
    act(() => {
      fireEvent.change(filterInput, { target: { value: "322088" } });
    });
    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    const filteredFirstRow = getAllByRole("checkbox")[0];
    expect(within(filteredFirstRow).findByText("322088"));

    const clearFilters = screen.getByText("Clear Sort/Filter");
    act(() => {
      userEvent.click(clearFilters);
    });
    await act(() => new Promise(process.nextTick));
    act(() => {
      fireEvent.change(expDate3, { target: { value: "01/20/2023" } });
    });
    await act(() => new Promise(process.nextTick));

    const nextPageBtn = screen.getByLabelText("Go to next page");
    await act(() => {
      userEvent.click(nextPageBtn);
    });

    unmount();
    cleanup();
  }, 20000));

describe("LPNDateCheckPage Save-All", () =>
  test("LPNDateCheckPage Save-All", async () => {
    Element.prototype.scrollTo = jest.fn();

    const { getAllByTestId, getByTestId, getAllByRole, unmount } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <LPNDateCheckPage></LPNDateCheckPage>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    const rows = getAllByRole("checkbox");
    const row0 = rows[0];
    const row1 = rows[1];
    const row2 = rows[2];
    const row3 = rows[3];

    const expDate0 = within(row0).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate1 = within(row1).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate2 = within(row2).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate3 = within(row3).getAllByPlaceholderText("mm/dd/yyyy")[1];

    act(() => {
      fireEvent.change(expDate0, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate1, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate2, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate3, { target: { value: "01/20/2023" } });
    });

    const saveAllButton = screen.getByText("Save All");

    await act(() => {
      fireEvent.click(saveAllButton);
    });

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    const notifModal = screen.getAllByRole("presentation")[0];
    expect(notifModal).toBeInTheDocument();

    await act(() => {
      userEvent.click(within(notifModal).getAllByRole("button")[1]);
    });

    unmount();
    cleanup();
  }, 20000));

describe("LPNDateCheckPage Changing/Filtering", () =>
  test("LPNDateCheckPage Modal", async () => {
    Element.prototype.scrollTo = jest.fn();

    const { getAllByTestId, getByTestId, getAllByRole, unmount } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <LPNDateCheckPage></LPNDateCheckPage>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    const rows = getAllByRole("checkbox");
    const row0 = rows[0];
    const row1 = rows[1];
    const row2 = rows[2];
    const row3 = rows[3];

    const expDate0 = within(row0).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate1 = within(row1).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate2 = within(row2).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate3 = within(row3).getAllByPlaceholderText("mm/dd/yyyy")[1];

    act(() => {
      fireEvent.change(expDate0, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate1, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate2, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate3, { target: { value: "01/20/2023" } });
    });

    //check page change
    //check on next button
    const nextPageBtn = screen.getByLabelText("Go to next page");
    await act(() => {
      userEvent.click(nextPageBtn);
    });

    let modal = screen.getByRole("dialog");
    expect(within(modal).getByText(en.clearWarningMessage)).toBeInTheDocument();

    let closeButton = within(modal).getByTestId("CloseIcon");
    await act(() => {
      userEvent.click(closeButton);
    });

    //check filter change
    const filterInput = screen.getAllByTestId("Filter Input")[0];

    act(() => {
      userEvent.type(filterInput, "3");
    });
    await act(() => new Promise(process.nextTick));

    modal = screen.getByRole("dialog");
    expect(within(modal).getByText(en.clearWarningMessage)).toBeInTheDocument();

    closeButton = within(modal).getByTestId("CloseIcon");
    await act(() => {
      userEvent.click(closeButton);
    });

    act(() => {
      fireEvent.change(filterInput, { target: { value: "" } });
    });
    await act(() => new Promise(process.nextTick));

    //check row change

    let rowsPerPageDropdown = screen.getByText("10");
    await act(() => {
      userEvent.click(rowsPerPageDropdown);
    });

    let optionRows = screen.getAllByRole("option")[2];
    await act(() => {
      userEvent.click(optionRows);
    });
    await act(() => new Promise(process.nextTick));

    modal = screen.getByRole("dialog");
    expect(within(modal).getByText(en.clearWarningMessage)).toBeInTheDocument();

    unmount();
    cleanup();
  }, 20000));

describe("LPNDateCheckPage Changing RowsPerPage", () =>
  test("LPNDateCheckPage Changing RowsPerPage", async () => {
    Element.prototype.scrollTo = jest.fn();

    const { getAllByRole, unmount } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <LPNDateCheckPage></LPNDateCheckPage>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );

    let rows = getAllByRole("checkbox");

    //check row change
    expect(rows.length).toBeLessThanOrEqual(10);

    let rowsPerPageDropdown = screen.getByText("10");
    await act(() => {
      userEvent.click(rowsPerPageDropdown);
    });

    let optionRows = screen.getAllByRole("option")[2];
    await act(() => {
      userEvent.click(optionRows);
    });

    expect(screen.queryByText(en.clearWarningMessage)).toBeNull();
    rows = getAllByRole("checkbox");
    expect(rows.length).toBeGreaterThan(10);

    unmount();
    cleanup();
  }, 20000));

describe("LPNDateCheckPage Error When Saving", () =>
  test("LPNDateCheckPage Error When Saving", async () => {
    Element.prototype.scrollTo = jest.fn();

    mock.onPost("/lpndatecheck/save-all").reply(function (config) {
      let data = JSON.parse(config.data);
      let req = data.lpnMultiAdjustRequest;
      let arr = [];
      for (let element of req) {
        arr.push({
          sourceContainerId: element.sourceContainerId,
          statusMessage: "LPN Date Update Successful.",
          isSuccess: false,
        });
      }
      return [
        200,
        {
          lpnSingleAdjustResponse: arr,
          requestLevelStatusMessage: "LPN Date Update Failure.",
          isSuccess: false,
        },
      ];
    });

    mock.onPost("/lpndatecheck/save-single-item").reply(function (config) {
      let data = JSON.parse(config.data);
      let req = data.lpnSingleAdjustRequest;
      let sourceId = req.sourceContainerId;
      let response = {
        sourceContainerId: sourceId,
        statusMessage: "LPN Date Update Failure.",
        isSuccess: false,
      };
      return [200, response];
    });

    const { getAllByTestId, getByTestId, getAllByRole, unmount } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <LPNDateCheckPage></LPNDateCheckPage>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    const rows = getAllByRole("checkbox");
    const row0 = rows[0];
    const row1 = rows[1];
    const row2 = rows[2];
    const row3 = rows[3];

    const expDate0 = within(row0).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate1 = within(row1).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate2 = within(row2).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate3 = within(row3).getAllByPlaceholderText("mm/dd/yyyy")[1];

    const saveButton = within(row0).getByTestId("SaveOutlinedIcon").parentElement;

    await act(() => {
      userEvent.click(saveButton);
    });

    await act(() => new Promise(process.nextTick));

    expect(mock.history.post.length).toBe(0); // times called

    let notifModal = screen.getAllByRole("presentation")[0];
    expect(notifModal).toBeInTheDocument();

    await act(() => {
      userEvent.click(within(notifModal).getAllByRole("button")[1]);
    });

    const saveAllButton = screen.getByText("Save All");

    await act(() => {
      fireEvent.click(saveAllButton);
    });

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    notifModal = screen.getAllByRole("presentation")[0];
    expect(notifModal).toBeInTheDocument();

    await act(() => {
      userEvent.click(within(notifModal).getAllByRole("button")[1]);
    });

    act(() => {
      fireEvent.change(expDate0, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate1, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate2, { target: { value: "01/20/2023" } });
    });
    act(() => {
      fireEvent.change(expDate3, { target: { value: "01/20/2023" } });
    });

    await act(() => {
      userEvent.click(saveButton);
    });

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    expect(mock.history.post.length).toBe(1); // times called

    notifModal = screen.getAllByRole("presentation")[0];
    expect(notifModal).toBeInTheDocument();

    await act(() => {
      userEvent.click(within(notifModal).getAllByRole("button")[1]);
    });

    const saveButton1 = within(row1).getByTestId("SaveOutlinedIcon").parentElement;
    await act(() => {
      userEvent.click(saveButton1);
    });
    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));
    notifModal = screen.getAllByRole("presentation")[0];
    expect(notifModal).toBeInTheDocument();
    await act(() => {
      userEvent.click(within(notifModal).getAllByRole("button")[1]);
    });

    await act(() => {
      fireEvent.click(saveAllButton);
    });

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    notifModal = screen.getAllByRole("presentation")[0];
    expect(notifModal).toBeInTheDocument();

    await act(() => {
      userEvent.click(within(notifModal).getAllByRole("button")[1]);
    });

    unmount();
    cleanup();
  }, 20000));

describe("LPNDateCheckPage Filtering", () =>
  test("LPNDateCheckPage Filtering", async () => {
    Element.prototype.scrollTo = jest.fn();

    const { getAllByTestId, getByTestId, getAllByRole, unmount } = render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
              <LPNDateCheckPage></LPNDateCheckPage>
            </BrowserRouter>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );

    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));
    await act(() => new Promise(process.nextTick));

    const rows = getAllByRole("checkbox");
    const row0 = rows[0];
    const row1 = rows[1];
    const row2 = rows[2];
    const row3 = rows[3];

    const expDate0 = within(row0).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate1 = within(row1).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate2 = within(row2).getAllByPlaceholderText("mm/dd/yyyy")[1];
    const expDate3 = within(row3).getAllByPlaceholderText("mm/dd/yyyy")[1];

    const filterInputs = screen.getAllByTestId("Filter Input");
    const filterInputLPNQuantity = filterInputs[5];
    const filterInputMfgDate = filterInputs[6];
    const filterInputExpDate = filterInputs[7];
    act(() => {
      fireEvent.change(filterInputMfgDate, { target: { value: "06/08/2021" } });
    });

    act(() => {
      fireEvent.change(filterInputExpDate, { target: { value: "05/18" } });
    });

    act(() => {
      fireEvent.change(filterInputLPNQuantity, { target: { value: "11" } });
    });

    await act(() => new Promise(process.nextTick));

    const filteredFirstRow = screen.getAllByRole("checkbox")[0];
    expect(within(filteredFirstRow).findByText("138864"));
    const clearFilters = screen.getByText("Clear Sort/Filter");
    act(() => {
      userEvent.click(clearFilters);
    });

    unmount();
    cleanup();
  }, 20000));

describe("LPNDateCheckPage Component", () =>
  test("LPNDateCheckPage snapshot", () => {
    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LPNDateCheckPage></LPNDateCheckPage>
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
    cleanup();
  }));
