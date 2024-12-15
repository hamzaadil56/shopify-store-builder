import React from "react";
import StepDescriptionContainer from "../components/StepDescriptionCard";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useStepper } from "../context/stepperContext";

const StoreAccess = () => {
  const { handleNext } = useStepper();
  return (
    <div>
      <StepDescriptionContainer
        stepTitle={"Store Access"}
        stepDescription={
          "This step consists in authorizing us to use our AI tools to build and customize your store. You can do so by setting your access scopes, and we'll do the rest. No worries, it takes 2 minutes, and we'll guide you along the way. Simply follow the steps below or watch the explanatory video."
        }
      />
      <Box marginY={4}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Follow the steps
            </Typography>
            <Box sx={{ color: "text.secondary", fontSize: 18 }}>
              {/* Previous steps remain the same */}
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                On your Admin Page, click on Online Store. Go to Preferences.
                Disable the box Restrict access to visitors with the password,
                and hit save at the bottom on the screen.
              </Typography>
            </Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button color="primary" variant="contained" sx={{ mt: 2 }}>
                Back
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={handleNext}
              >
                Next
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default StoreAccess;
