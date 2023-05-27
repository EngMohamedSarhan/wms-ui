/* eslint-disable no-undef */
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { fireEvent, render, screen } from "@testing-library/react";
import { React } from "react";
import { Provider } from "react-redux";
import ShallowRenderer from "react-shallow-renderer";

import { store } from "../../redux/store";
import LPNDateTableRow from "./LPNDateTableRow";
import theme from "../../styles/theme";
import { ThemeProvider } from "@mui/material";

const rowData = {
  id: "0",
  itemId: "532432",
  itemDescription: "243 SA",
  ilpnId: "2222X",
  lpnStatus: "Not Allocated",
  locationId: "06203A",
  lpnQuantityInCases: 13,
  reason: "EXP DATE ITEM MISSING EXPDATE",
  dateCode: "E",
  trackManufacturingDate: 1,
  trackExpiryDate: 1,
  mfgDateDiff: 8,
  manufacturedDate: "2021-06-17T",
  expirationDate: "2022-05-13T",
  consumptionPriorityDate: "2022-06-17T",
};

describe("LPNDateTableRow Component", () =>
  test("LPNDateTableRow action", () => {
    const onRowUpdate = jest.fn();
    const onRowSave = jest.fn();
    const setIsPageUpdated = jest.fn();
    const onRowSaveFailed = jest.fn();
    const onRowValidation = jest.fn();
    const { container } = render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <LPNDateTableRow
            row={rowData}
            index={0}
            unsavedRowsRef={{}}
            onRowValidation={onRowValidation}
            onRowUpdate={onRowUpdate}
            onRowSave={onRowSave}
            onRowSaveFailed={onRowSaveFailed}
            setIsPageUpdated={setIsPageUpdated}
            saveAllCounter={0}
          />
        </LocalizationProvider>
      </Provider>
    );

    const saveButton = container.getElementsByTagName("button")[0];
    fireEvent.click(saveButton);
    expect(onRowUpdate).not.toBeCalled();
  }));

describe("LPNDateTableRow Component", () =>
  test("LPNDateTableRow snapshot", () => {
    const onRowUpdate = jest.fn();
    const onRowSave = jest.fn();
    const onRowSaveFailed = jest.fn();
    const setIsUpdated = jest.fn();
    const onRowValidation = jest.fn();

    const renderer = new ShallowRenderer();
    renderer.render(
      <Provider store={store}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <LPNDateTableRow
            row={rowData}
            index={0}
            unsavedRowsRef={{}}
            onRowValidation={onRowValidation}
            onRowUpdate={onRowUpdate}
            saveAllCounter={0}
            setIsPageUpdated={setIsUpdated}
            onRowSave={onRowSave}
            onRowSaveFailed={onRowSaveFailed}
          />
        </LocalizationProvider>
      </Provider>
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));

describe("LPNDateTableRow Component", () =>
  test("LPNDateTableRow action", () => {
    const onRowUpdate = jest.fn();
    const onRowSave = jest.fn();
    const onRowSaveFailed = jest.fn();
    const ref = { current: {} };
    const setIsUpdated = jest.fn();
    const onRowValidation = jest.fn();

    render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <LPNDateTableRow
              row={rowData}
              index={0}
              unsavedRowsRef={ref}
              onRowValidation={onRowValidation}
              onRowUpdate={onRowUpdate}
              onRowSave={onRowSave}
              onRowSaveFailed={onRowSaveFailed}
              saveAllCounter={0}
              setIsPageUpdated={setIsUpdated}
            />
          </LocalizationProvider>
        </ThemeProvider>
      </Provider>
    );
    const mfgDatePicker = screen.getAllByPlaceholderText("mm/dd/yyyy")[0];
    const expDatePicker = screen.getAllByPlaceholderText("mm/dd/yyyy")[1];
    const conPrioDatePicker = screen.getAllByPlaceholderText("mm/dd/yyyy")[2];

    expect(mfgDatePicker.value).toEqual("06/17/2021");

    fireEvent.change(mfgDatePicker, { target: { value: "08/20/2022" } });
    expect(mfgDatePicker.value).toEqual("08/20/2022");

    fireEvent.change(expDatePicker, { target: { value: "08/20/2022" } });
    expect(expDatePicker.value).toEqual("08/20/2022");

    fireEvent.change(conPrioDatePicker, { target: { value: "08/20/2022" } });
    expect(conPrioDatePicker.value).toEqual("08/20/2022");
  }));
