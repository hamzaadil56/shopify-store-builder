import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useStepper } from "../context/stepperContext";
import { StepConnector } from "@mui/material";
export default function StoreStepper() {
  const {
    steps,
    activeStep,
    completedSteps,
    handleNext,
    handleBack,
    handleReset,
  } = useStepper();

  return (
    <Box
      sx={{
        maxWidth: 400,
        marginY: 4,
      }}
    >
      <Box mb={4}>
        <Typography component={"p"} variant="h6">
          AI Store Builder
        </Typography>
        <Typography component={"p"} color="text.secondary" gutterBottom>
          Using generative AI to build a Shopify Store
        </Typography>
      </Box>

      <Stepper
        connector={
          <StepConnector
            sx={{
              marginLeft: "15px",
            }}
          />
        }
        activeStep={activeStep}
        orientation="vertical"
      >
        {steps.map((step, index) => (
          <Step key={step.label} completed={completedSteps.includes(index)}>
            <StepLabel
              optional={
                <Typography variant="caption">{step.description}</Typography>
              }
              sx={{
                "& .MuiSvgIcon-root": {
                  width: "30px", // Adjust width
                  height: "30px",
                  // Background color for visibility
                },
                "& .MuiStepLabel-labelContainer": {
                  marginLeft: "15px",
                },
              }}
            >
              <Typography component={"p"}>{step.label}</Typography>
            </StepLabel>
            {/* <StepContent>
              <Typography>{step.description}</Typography>
            </StepContent> */}
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
    </Box>
  );
}
