import React from "react";
import { Box } from "@mui/material";
import StepContainer from "./StepsContainer";
import { useStepper } from "../context/stepperContext";

const StepWrapper = () => {
  const { activeStep, steps } = useStepper();

  return (
    <>
      <Box sx={{ flex: 1 }}>
        <StepContainer />
      </Box>
      <Box sx={{ flex: 1 }}>{steps[activeStep]?.component}</Box>
    </>
  );
};

export default StepWrapper;
