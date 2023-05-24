import { CheckOutlined, ErrorOutline, SaveOutlined } from "@mui/icons-material";
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
import { TRACK_DATE } from "../../utilities/constants/enums";
import columns from "../../utilities/constants/lpn-date-table-columns";
import { getDateFromPicker } from "../../utilities/functions/date";
import { formatRow } from "../../utilities/functions/format";
import en from "../../utilities/json/en.json";

const LPNDateTableRow = ({
  unsavedRowsRef,
  row,
  error,
  index,
  onRowValidation,
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

  const handleSuggestedDateFade = () => {
    if (
      (row.reason.includes("CPD Null") ||
        row.reason.includes("VINTAGE SPECIFIC CPD <> 01-01 VINTAGE YEAR")) &&
      consumptionPriorityDate === row.suggestedCPD
    ) {
      return false;
    }

    if (
      (row.reason.includes("MFG DATE ITEM MISSING EXP DATE") ||
        row.reason.includes("MFG DATE TRACKED CPD <> EXP DATE") ||
        row.reason.includes("Exp DATE TRACKED CPD <> EXP DATE")) &&
      row.suggestedCPD === consumptionPriorityDate &&
      row.suggestedCPD === manufactureDate
    ) {
      return false;
    }

    return true;
  };

  const handleSuggestedCPD = () => {
    switch (true) {
      case row.reason.includes("CPD Null") ||
        row.reason.includes("VINTAGE SPECIFIC CPD <> 01-01 VINTAGE YEAR"):
        handlePriortyDateChange(row.suggestedCPD);
        break;
      case row.reason.includes("MFG DATE ITEM MISSING EXP DATE") ||
        row.reason.includes("MFG DATE TRACKED CPD <> EXP DATE") ||
        row.reason.includes("Exp DATE TRACKED CPD <> EXP DATE"):
        handlePriortyDateChange(row.suggestedCPD);
        handleExpirationDateChange(row.suggestedCPD);
        break;
      default:
        break;
    }
  };

  const handlePostAdjustOne = () => {
    if (!onRowValidation(index)) {
      return;
    }

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
              <DatePicker
                data-testid="Consumption Priority Date"
                value={consumptionPriorityDate}
                inputFormat="MM/DD/YYYY"
                onChange={handlePriortyDateChange}
                renderInput={(params) => <TextField size="small" {...params} />}
              />
            );
          case column.isAcceptDate:
            if (row.reason.includes("Suggested Date <> NULL") || !row.suggestedCPD) {
              break;
            }

            return row.suggestedCPD ? (
              <Fade in={handleSuggestedDateFade()}>
                <Tooltip title={en.suggestedCpdTooltip} enterTouchDelay={0}>
                  <IconButton sx={{ p: 0 }} onClick={handleSuggestedCPD}>
                    <CheckOutlined color="success" />
                  </IconButton>
                </Tooltip>
              </Fade>
            ) : null;
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
              <Grid container alignItems="center" justifyContent="flex-end">
                {error ? (
                  <Tooltip title={error}>
                    <ErrorOutline htmlColor="white" sx={{ mr: 1 }} />
                  </Tooltip>
                ) : null}
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
              </Grid>
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
    <Tooltip title={row.reason} enterTouchDelay={0}>
      <StyledTableRow
        hover={!isUpdated}
        change={isUpdated}
        error={error}
        role="checkbox"
        tabIndex={-1}
        key={row.code}
      >
        {renderColumns()}
      </StyledTableRow>
    </Tooltip>
  );
};

LPNDateTableRow.propTypes = {
  row: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  error: PropTypes.string,
  onRowValidation: PropTypes.func.isRequired,
  onRowSave: PropTypes.func.isRequired,
  onRowSaveFailed: PropTypes.func.isRequired,
  unsavedRowsRef: PropTypes.object.isRequired,
  setIsPageUpdated: PropTypes.func.isRequired,
  saveAllCounter: PropTypes.number.isRequired,
};

export default LPNDateTableRow;
