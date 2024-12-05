import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StepperProvider } from "./context/stepperContext.jsx";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StepperProvider>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </StepperProvider>
  </StrictMode>
);
