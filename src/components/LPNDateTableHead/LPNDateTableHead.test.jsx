/* eslint-disable no-undef */
import { fireEvent, render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";

import React from "react";
import ShallowRenderer from "react-shallow-renderer";
import RotatableArrowUpward from "../../components-styled/RotatableArrowUpward/RotatableArrowUpward";

import { SortOrders } from "../../utilities/constants/sort";
import LPNDateTableHead from "./LPNDateTableHead";
import columns from "../../utilities/constants/lpn-date-table-columns";
import handleFilterChange from "./LPNDateTableHead";

describe("LPNDateTableHead Component", () =>
  test("LPNDateTableHead action", async () => {
    const setSort = jest.fn();
    const setSortOrder = jest.fn();
    const setFilters = jest.fn();
    const onFilter = jest.fn();
    var unsavedRowsRefe = { current: {} };
    const { container, getAllByTestId } = render(
      <table>
        <LPNDateTableHead
          unsavedRowsRef={unsavedRowsRefe}
          setSort={setSort}
          sortOrder={SortOrders.asc}
          setSortOrder={setSortOrder}
          filters={{ itemId: "filterActiveTest" }}
          setFilters={setFilters}
          onFilter={onFilter}
        />
      </table>
    );
    const sortButton = container.getElementsByTagName("button")[0];
    fireEvent.click(sortButton);
    expect(setSort).toBeCalled();
    expect(setSortOrder).toBeCalled();

    const filterInput = getAllByTestId("Filter Input")[0];
    fireEvent.change(filterInput, { target: { value: "" } });
    expect(setFilters).toBeCalledWith({});
  }));

describe("LPNDateTableHead Component", () =>
  test("LPNDateTableHead action desc", () => {
    const setSort = jest.fn();
    const setSortOrder = jest.fn();
    const setFilters = jest.fn();
    const onFilter = jest.fn();
    var unsavedRowsRefe = { current: {} };
    const { container } = render(
      <table>
        <LPNDateTableHead
          unsavedRowsRef={unsavedRowsRefe}
          sort="itemId"
          setSort={setSort}
          sortOrder={SortOrders.desc}
          setSortOrder={setSortOrder}
          filters={{}}
          setFilters={setFilters}
          onFilter={onFilter}
        />
      </table>
    );
    const sortButton = container.getElementsByTagName("button")[0];
    fireEvent.click(sortButton);
    expect(setSort).toBeCalled();
    expect(setSortOrder).toBeCalled();
    expect(setSort).toHaveBeenCalledWith(null);
    expect(setSortOrder).toHaveBeenCalledWith(SortOrders.asc);

    const filterInput = container.getElementsByTagName("input")[0];
    fireEvent.change(filterInput, { target: { value: "a" } });

    expect(setFilters).toBeCalled();
    expect(onFilter).toBeCalled();
  }));

describe("LPNDateTableHead Component", () =>
  test("LPNDateTableHead action asc", () => {
    const setSort = jest.fn();
    const setSortOrder = jest.fn();
    const setFilters = jest.fn();
    const onFilter = jest.fn();
    var unsavedRowsRefe = { current: {} };
    const { container } = render(
      <table>
        <LPNDateTableHead
          unsavedRowsRef={unsavedRowsRefe}
          sort="itemId"
          setSort={setSort}
          sortOrder={SortOrders.asc}
          setSortOrder={setSortOrder}
          filters={{}}
          setFilters={setFilters}
          onFilter={onFilter}
        />
      </table>
    );
    const sortButton = container.getElementsByTagName("button")[0];
    fireEvent.click(sortButton);
    expect(setSortOrder).toHaveBeenCalledWith(SortOrders.desc);
  }));

describe("LPNDateTableHead Component", () =>
  test("LPNDateTableHead snapshot", () => {
    const setSort = jest.fn();
    const setSortOrder = jest.fn();
    const setFilters = jest.fn();
    const onFilter = jest.fn();
    var unsavedRowsRefe = { current: {} };
    const renderer = new ShallowRenderer();
    renderer.render(
      <LPNDateTableHead
        unsavedRowsRef={unsavedRowsRefe}
        setSort={setSort}
        sortOrder={SortOrders.asc}
        setSortOrder={setSortOrder}
        filters={{}}
        setFilters={setFilters}
        onFilter={onFilter}
      />
    );
    expect(renderer.getRenderOutput()).toMatchSnapshot();
  }));
