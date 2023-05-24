import { FormControl, MenuItem, Select } from "@mui/material";
import PropTypes from "prop-types";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  INITIAL_SELECTED_WAREHOUSE,
  setSelectedWarehouse,
} from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";

const WarehousePicker = ({ onChange, ...props }) => {
  const dispatch = useDispatch();
  const { selectedWarehouse, warehouses } = useSelector(settingsState);

  const handleChange = (event) =>
    onChange
      ? onChange(() => dispatch(setSelectedWarehouse(event.target.value)))
      : dispatch(setSelectedWarehouse(event.target.value));

  const renderWarehouses = () =>
    warehouses.length > 0 ? (
      warehouses.map(({ warehouseShortName }) => (
        <MenuItem key={warehouseShortName} value={warehouseShortName}>
          {warehouseShortName}
        </MenuItem>
      ))
    ) : (
      <MenuItem value={INITIAL_SELECTED_WAREHOUSE}>
        {INITIAL_SELECTED_WAREHOUSE}
      </MenuItem>
    );

  return (
    <FormControl {...props}>
      <Select
        color="primary"
        size="small"
        data-testid="warehouse-select"
        value={selectedWarehouse}
        onChange={handleChange}
        sx={{ minWidth: 200 }}
      >
        {renderWarehouses()}
      </Select>
    </FormControl>
  );
};

WarehousePicker.propTypes = {
  onChange: PropTypes.func,
};

export default WarehousePicker;
