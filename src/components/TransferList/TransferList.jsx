import { Close } from "@mui/icons-material";
import {
  Checkbox,
  colors,
  Divider,
  Fade,
  IconButton,
  ListItemButton,
  TextField,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItemText from "@mui/material/ListItemText";
import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";

const TransferList = ({
  title,
  label,
  items,
  selected,
  onSelect,
  onSelectAll,
  renderBy,
  valueBy,
  ...props
}) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => setFilter(e.target.value);

  const handleFilterReset = () => setFilter("");

  const getRenderByValue = (item) => {
    if (typeof renderBy === "string") {
      return item[renderBy];
    } else {
      return renderBy.map((key) => item[key]).join(" ");
    }
  };

  const renderItems = () =>
    items
      .filter((item) => {
        let value = item;

        if (renderBy) {
          value = getRenderByValue(item);
        }

        return value.toLowerCase().includes(filter.toLowerCase());
      })
      .map((item) => {
        let [value, text] = [item, item];

        if (renderBy) {
          text = getRenderByValue(item);
        }

        if (valueBy) {
          value = item[valueBy];
        }

        return (
          <Fragment key={value}>
            <Divider />
            <ListItemButton role="listitem" onClick={() => onSelect(value)}>
              <Grid container alignItems="center">
                <Grid item xs={2}>
                  <Checkbox checked={selected.indexOf(value) !== -1} />
                </Grid>
                <Grid item>
                  <ListItemText primary={text} />
                </Grid>
              </Grid>
            </ListItemButton>
          </Fragment>
        );
      });

  return (
    <Grid container {...props}>
      <Typography color="primary" fontWeight="500" mb={1}>
        {title}
      </Typography>
      <Grid
        item
        sx={{
          height: "100%",
          width: "100%",
          overflow: "auto",
          pt: 3,
          backgroundColor: colors.grey[100],
        }}
      >
        <Grid item>
          <Grid container>
            <Grid item xs={2} />
            <Grid item>
              <Typography color="primary" fontWeight="600" ml={0.5}>
                {label}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="center" mt={1}>
            <Grid item xs={2}>
              <Checkbox
                checked={selected.length === items.length}
                onChange={onSelectAll}
                sx={{ ml: 2 }}
              />
            </Grid>
            <Grid item xs={10}>
              <Grid container alignItems="center">
                <Grid item xs={5}>
                  <TextField
                    size="small"
                    value={filter}
                    inputProps={{
                      sx: { p: 0.5 },
                    }}
                    InputProps={{
                      endAdornment: (
                        <Fade in={Boolean(filter)}>
                          <IconButton
                            sx={{ p: 0, marginRight: -1 }}
                            onClick={handleFilterReset}
                          >
                            <Close color="error" />
                          </IconButton>
                        </Fade>
                      ),
                    }}
                    onChange={handleFilterChange}
                  />
                </Grid>
                <Grid item>
                  <Typography
                    ml={1}
                    color="primary.main"
                    fontSize={14}
                    fontWeight="600"
                  >
                    {`(Total Count: ${items.length})${
                      selected.length
                        ? ` (Selected Records: ${selected.length})`
                        : ""
                    }`}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <List dense component="div" role="list">
            {renderItems()}
            {items.length !== 0 ? <Divider /> : null}
          </List>
        </Grid>
      </Grid>
    </Grid>
  );
};

TransferList.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  onSelectAll: PropTypes.func.isRequired,
  renderBy: PropTypes.string,
  valueBy: PropTypes.string,
};

export default TransferList;
