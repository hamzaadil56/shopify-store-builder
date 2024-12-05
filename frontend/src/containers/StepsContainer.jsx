import { Box, LinearProgress } from "@mui/material";
import React from "react";
import BorderLinearProgress from "../components/BorderLinearProgress";
import StoreStepper from "../components/Stepper";

const StepContainer = () => {
  return (
    <Box >
      <BorderLinearProgress variant="determinate" value={50} />
      <StoreStepper />
    </Box>
  );
};

export default StepContainer;
