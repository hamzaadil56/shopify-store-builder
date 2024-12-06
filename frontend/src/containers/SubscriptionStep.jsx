import React from "react";
import StepDescriptionCard from "../components/StepDescriptionCard";
import { Box, Stack, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const SubscriptionStep = () => {
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
            <Box>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"span"}
                gutterBottom
              >
                Your current Shopify plan:
              </Typography>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"span"}
                gutterBottom
              >
                Shopify Trial
              </Typography>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                When successfully subscribed to a Shopify plan, press Submit.
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
                Submit
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default SubscriptionStep;
