import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import BorderLinearProgress from "./components/BorderLinearProgress";
import { Container, Typography, Box, Stack } from "@mui/material";
import StepContainer from "./containers/StepsContainer";
import StepDescriptionContainer from "./components/StepDescriptionCard";
import StepActionCard from "./components/Step1ActionCard";
import { useStepper } from "./context/stepperContext";
import StepWrapper from "./containers/StepWrapper";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box>
          <Typography variant="h4" component={"h1"}>
            Welcome to the Ecom King AI Store Builder
          </Typography>
          <Typography variant="h5" component={"h1"}>
            Version 1.1
          </Typography>
        </Box>
        <Stack direction={"row"}>
          <StepWrapper />
        </Stack>
      </Container>
    </main>
  );
}

export default App;
