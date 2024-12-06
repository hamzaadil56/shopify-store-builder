import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { StepperProvider } from "./context/stepperContext.jsx";
import { theme } from "./theme/index.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <StepperProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StepperProvider>
  </StrictMode>
);
