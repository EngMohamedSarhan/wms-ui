import { CheckOutlined, SaveOutlined } from "@mui/icons-material";
import {
  Fade,
  Grid,
  IconButton,
  TableCell,
  TextField,
  Tooltip,
} from "@mui/material";
import { DatePicker, MobileDatePicker } from "@mui/x-date-pickers";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SquareButton from "../../components-styled/SquareButton/SquareButton";
import StyledTableRow from "../../components-styled/StyledTableRow/StyledTableRow";
import usePostAdjustOne from "../../hooks/usePostAdjustOne";
import { openNotification } from "../../redux/reducers/settingsSlice";
import { settingsState } from "../../redux/store";
import columns from "../../utilities/constants/lpn-date-table-columns";
import { getDateFromPicker } from "../../utilities/functions/date";
import { formatRow } from "../../utilities/functions/format";
import en from "../../utilities/json/en.json";
import { TRACK_DATE } from "../../utilities/constants/enums";

const LPNDateTableRow = ({
  unsavedRowsRef,
  row,
  index,
  onRowSave,
  onRowSaveFailed,
  saveAllCounter,
  setIsPageUpdated,
}) => {
  const dispatch = useDispatch();
  const isMftdDateChangedRef = useRef(false);
  const isExpiredDateChangedRef = useRef(false);
  const isCPDChangedRef = useRef(false);
  const { selectedWarehouse } = useSelector(settingsState);
  const { postAdjustOne } = usePostAdjustOne();
  const [manufactureDate, setManufactureDate] = useState(
    row.manufacturedDate || null
  );
  const [expirationDate, setExpirationDate] = useState(row.expirationDate || null);
  const [consumptionPriorityDate, setConsumptionPriorityDate] = useState(
    row.consumptionPriorityDate || null
  );
  const [isUpdated, setIsUpdated] = useState(false);

  const handleManufactureDateChange = (value) => {
    if (!value || value == "") {
      setManufactureDate(null);
      if (row.manufacturedDate) {
        setIsUpdated(true);
        isMftdDateChangedRef.current = true;
      }
      return;
    }

    const date = getDateFromPicker(value);

    if (date !== manufactureDate) {
      isMftdDateChangedRef.current = true;
      setIsUpdated(true);
      setManufactureDate(date);
    }
  };

  const handleExpirationDateChange = (value) => {
    if (!value || value == "") {
      setExpirationDate(null);
      if (row.expirationDate) {
        setIsUpdated(true);
        isExpiredDateChangedRef.current = true;
      }
      return;
    }

    const date = getDateFromPicker(value);

    if (date !== expirationDate) {
      isExpiredDateChangedRef.current = true;
      setIsUpdated(true);
      setExpirationDate(date);
    }
  };

  const handlePriortyDateChange = (value) => {
    if (!value || value == "") {
      setConsumptionPriorityDate(null);
      if (row.consumptionPriorityDate) {
        setIsUpdated(true);
        isCPDChangedRef.current = true;
      }
      return;
    }

    const date = typeof value === "string" ? value : getDateFromPicker(value);

    if (date !== consumptionPriorityDate) {
      isCPDChangedRef.current = true;
      setIsUpdated(true);
      setConsumptionPriorityDate(date);
    }
  };

  const handleSuggestedCPD = () => handlePriortyDateChange(row.suggestedCPD);

  const handlePostAdjustOne = () => {
    postAdjustOne(
      {
        lpnSingleAdjustRequest: formatRow(
          row,
          isMftdDateChangedRef.current,
          isExpiredDateChangedRef.current,
          isCPDChangedRef.current,
          manufactureDate,
          expirationDate,
          consumptionPriorityDate,
          selectedWarehouse
        ),
        location: selectedWarehouse,
      },
      ({ isSuccess, sourceContainerId, statusMessage }) => {
        if (isSuccess) {
          setIsUpdated(false);
        }
        dispatch(
          openNotification({
            title: en.details,
            message: [
              {
                message: `${sourceContainerId} ${
                  isSuccess ? en.saveSuccessMessage : statusMessage
                }`,
                isSuccess,
                status: isSuccess ? en.success : en.error,
              },
            ],
          })
        );

        if (isSuccess) {
          onRowSave(index);
        } else {
          onRowSaveFailed(index);
        }
      }
    );
  };

  const handleReset = () => {
    setIsUpdated(false);
    setManufactureDate(row.manufacturedDate || null);
    setExpirationDate(row.expirationDate || null);
    setConsumptionPriorityDate(row.consumptionPriorityDate || null);
    isMftdDateChangedRef.current = false;
    isExpiredDateChangedRef.current = false;
    isCPDChangedRef.current = false;
  };

  const handleSave = () => {
    if (isUpdated) {
      handlePostAdjustOne();
    } else {
      dispatch(openNotification({ title: en.error, message: en.saveErrorMessage }));
    }
  };

  const renderColumns = () =>
    columns.map((column) => {
      const value = row[column.id];
      const renderChildren = (() => {
        switch (true) {
          case column.format && typeof value === "number":
            return column.format(value);
          case column.isManufactureDate:
            if (
              !row.trackManufacturingDate ||
              row.trackManufacturingDate === TRACK_DATE.No
            ) {
              break;
            }

            return (
              <DatePicker
                data-testid="Manufactured Date"
                value={manufactureDate}
                inputFormat="MM/DD/YYYY"
                onChange={handleManufactureDateChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            );
          case column.isExpirationDate:
            if (!row.trackExpiryDate || row.trackExpiryDate === TRACK_DATE.No) {
              break;
            }

            return (
              <DatePicker
                data-testid="Expiration Date"
                value={expirationDate}
                inputFormat="MM/DD/YYYY"
                onChange={handleExpirationDateChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            );
          case column.isPriorityDate:
            return (
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  {row.suggestedCPD ? (
                    <Fade in={consumptionPriorityDate !== row.suggestedCPD}>
                      <Tooltip title={en.suggestedCpdTooltip}>
                        <IconButton sx={{ p: 0 }} onClick={handleSuggestedCPD}>
                          <CheckOutlined color="success" />
                        </IconButton>
                      </Tooltip>
                    </Fade>
                  ) : null}
                </Grid>
                <Grid item xs={10}>
                  <DatePicker
                    data-testid="Consumption Priority Date"
                    value={consumptionPriorityDate}
                    inputFormat="MM/DD/YYYY"
                    onChange={handlePriortyDateChange}
                    renderInput={(params) => <TextField size="small" {...params} />}
                  />
                </Grid>
              </Grid>
            );
          case column.isSuggestedCPD:
            if (!value) {
              break;
            }

            return (
              <MobileDatePicker
                readOnly
                value={value}
                inputFormat="MM/DD/YYYY"
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            );
          case column.isSave:
            return (
              <SquareButton
                variant="contained"
                color="primary"
                onClick={handleSave}
                sx={{
                  mr: 1,
                  backgroundColor: "#fff",
                  ["&:hover"]: {
                    backgroundColor: "primary.main",
                    color: "#fff",
                    [".MuiSvgIcon-root"]: {
                      color: "#fff",
                    },
                  },
                }}
              >
                <SaveOutlined color="primary" />
              </SquareButton>
            );
          default:
            return value;
        }
      })();

      return (
        <TableCell
          key={column.id}
          align={column.align}
          sx={{ p: 0.5, pl: 1, pr: 1, ...column.sx }}
        >
          {renderChildren}
        </TableCell>
      );
    });

  useEffect(() => {
    handleReset();
  }, [saveAllCounter, row]);

  useEffect(() => {
    if (isUpdated) {
      unsavedRowsRef.current[index] = formatRow(
        row,
        isMftdDateChangedRef.current,
        isExpiredDateChangedRef.current,
        isCPDChangedRef.current,
        manufactureDate,
        expirationDate,
        consumptionPriorityDate,
        selectedWarehouse
      );
      setIsPageUpdated(true);
    }
  }, [expirationDate, manufactureDate, consumptionPriorityDate, isUpdated]);

  return (
    <StyledTableRow
      hover={!isUpdated}
      change={isUpdated}
      role="checkbox"
      tabIndex={-1}
      key={row.code}
    >
      {renderColumns()}
    </StyledTableRow>
  );
};

LPNDateTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  onRowSave: PropTypes.func.isRequired,
  onRowSaveFailed: PropTypes.func.isRequired,
  unsavedRowsRef: PropTypes.object.isRequired,
  setIsPageUpdated: PropTypes.func.isRequired,
  saveAllCounter: PropTypes.number.isRequired,
};

export default LPNDateTableRow;
