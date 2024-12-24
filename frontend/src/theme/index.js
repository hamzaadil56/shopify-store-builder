import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#04ba22",
    },
    secondary: {
      main: "#dc004e",
    },

    mode: "dark",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
  },
  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: "capitalize",
          fontWeight: "bold",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "20px",
          backgroundColor: "#0e0e0f",
        },
      },
    },
  },
});
