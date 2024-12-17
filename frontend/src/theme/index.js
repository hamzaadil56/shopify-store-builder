import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#0db7ba",
    },
    secondary: {
      main: "#dc004e",
    },

    mode: "dark",
  },
  typography: {
    fontFamily: "Montserrat, sans-serif",
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
  },
});
