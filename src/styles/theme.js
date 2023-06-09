import { createTheme } from "@mui/material";

import { primaryFontFamily } from "./styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#69001a",
    },
    secondary: {
      main: "#1C0076",
    },
    gray: {
      main: "#AFA79E",
    },
    select: {
      main: "#BFB7B0",
    },
  },
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontFamily: primaryFontFamily,
          fontWeight: "Regular",
          color: "#1D1D1D",
          fontSize: "14px",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: primaryFontFamily,
          textTransform: "uppercase",
          fontWeight: "600",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontFamily: primaryFontFamily,
          fontWeight: "Regular",
          color: "#1D1D1D",
        },
        h1: {
          fontSize: "3.375rem",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "-0.01rem",
        },
        h2: {
          fontSize: "1.953rem",
          letterSpacing: "-0.01rem",
          fontWeight: "600",
        },
        h3: {
          fontSize: "1.563rem",
        },
        h4: {
          fontSize: "1.25rem",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: primaryFontFamily,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontFamily: primaryFontFamily,
          textTransform: "none",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          fontFamily: primaryFontFamily,
        },
      },
    },
  },
});

export default theme;
