import React from "react";
import StepDescriptionCard from "../components/StepDescriptionCard";
import {
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  Card,
} from "@mui/material";

const CustomizationStep = () => {
  return (
    <div>
      <StepDescriptionCard
        stepTitle={"Set Access Scopes"}
        stepDescription={
          "This step consists in authorizing us to use our AI tools to build and customize your store. You can do so by setting your access scopes, and we'll do the rest. No worries, it takes 2 minutes, and we'll guide you along the way. Simply follow the steps below or watch the explanatory video."
        }
      />
      <Box marginY={4}>
        <Card variant="outlined">
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
                1. In the same Settings section, go to plan. Click on Choose
                plan, and select your plan. Then, set your payment method.
              </Typography>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                2. Press Subscribe.
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

export default CustomizationStep;
