import { styled, TableRow } from "@mui/material";

const StyledTableRow = styled(TableRow)(({ theme, change, error }) => ({
  ...(change
    ? { backgroundColor: theme.palette.select.main }
    : {
        "&:nth-of-type(odd)": {
          backgroundColor: theme.palette.action.hover,
        },
      }),
  ...(error && { backgroundColor: theme.palette.error.light }),
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default StyledTableRow;
