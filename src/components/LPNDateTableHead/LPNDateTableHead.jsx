import {
  Grid,
  IconButton,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import PropTypes from "prop-types";
import React from "react";

import RotatableArrowUpward from "../../components-styled/RotatableArrowUpward/RotatableArrowUpward";
import columns from "../../utilities/constants/lpn-date-table-columns";
import { SortOrders } from "../../utilities/constants/sort";

const LPNDateTableHead = ({
  sort,
  unsavedRowsRef,
  setSort,
  sortOrder,
  setSortOrder,
  filters,
  setFilters,
  onFilter,
  onChangesModalOpen,
}) => {
  const handleResetSort = () => {
    setSort(null);
    setSortOrder(SortOrders.asc);
  };

  const handleSort = (id) => {
    if (Object.keys(unsavedRowsRef.current).length !== 0) {
      onChangesModalOpen();
      return;
    }

    if (sort !== id) {
      setSort(id);
      setSortOrder(SortOrders.asc);
    } else if (sortOrder === SortOrders.asc) {
      setSortOrder(SortOrders.desc);
    } else {
      handleResetSort();
    }
  };

  const handleFilterChange = (e, id) => {
    if (Object.keys(unsavedRowsRef.current).length !== 0) {
      onChangesModalOpen();
      return;
    }

    if (!e.target.value) {
      delete filters[id];
      setFilters({ ...filters });
    } else {
      filters = { ...filters, [id]: e.target.value };
      setFilters(filters);
    }
    onFilter(filters);
  };

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            sx={{
              minWidth: column.minWidth,
              fontSize: "16px",
              color: "primary.main",
              pt: 0.5,
              p: 1,
            }}
          >
            {!column.isSave ? (
              <Grid container flexDirection="column">
                <Grid container>
                  <Grid item xs={8} sx={{ height: 75 }}>
                    {column.label}
                  </Grid>
                  <Grid item xs={4}>
                    <IconButton
                      color={sort === column.id ? "primary" : undefined}
                      size="small"
                      sx={{ marginLeft: "2px", width: 24, height: 24 }}
                      onClick={() => handleSort(column.id)}
                    >
                      <RotatableArrowUpward
                        fontSize="small"
                        open={sort === column.id && sortOrder === SortOrders.desc}
                      />
                    </IconButton>
                  </Grid>
                </Grid>
                <TextField
                  size="small"
                  inputProps={{ sx: { p: 0.2, pl: 0.5, pr: 0.5 }, "data-testid":"Filter Input"}}
                  value={filters[column.id] || ""}
                  onChange={(e) => handleFilterChange(e, column.id)}
                  
                />
              </Grid>
            ) : null}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

LPNDateTableHead.propTypes = {
  sort: PropTypes.string,
  unsavedRowsRef: PropTypes.object.isRequired,
  setSort: PropTypes.func.isRequired,
  sortOrder: PropTypes.string.isRequired,
  setSortOrder: PropTypes.func.isRequired,
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
  onChangesModalOpen: PropTypes.func.isRequired,
};

export default LPNDateTableHead;
