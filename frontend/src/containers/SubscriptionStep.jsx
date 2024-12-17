import React, { useState } from "react";
import StepDescriptionCard from "../components/StepDescriptionCard";
import { Box, Stack, Typography, Button } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useStepper } from "../context/stepperContext";
import { toast } from "react-toastify";

const SubscriptionStep = () => {
  const { handleNext, handleBack } = useStepper();
  const [planError, setPlanError] = useState(false);
  const formData = JSON.parse(localStorage.getItem("shopifyConfig"));
  const checkPlan = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/shop`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token: formData?.accessToken,
            storeUrl: `https://${formData?.storeName}/admin/api/2024-10/graphql.json`,
          }),
        }
      );

      const data = await response.json();
      if (data.error) {
        throw new Error("An error occured! Please try again later");
      }

      if (data?.plan === "Trial") {
        setPlanError(true);
        return;
      }
      handleNext();
    } catch (error) {
      toast.error(error.message);
      return;
    }
  };
  return (
    <div>
      <StepDescriptionCard
        stepTitle={"Set Access Scopes"}
        stepDescription={
          "This step consists in authorizing us to use our AI tools to build and customize your store. You can do so by setting your access scopes, and we'll do the rest. No worries, it takes 2 minutes, and we'll guide you along the way. Simply follow the steps below or watch the explanatory video."
        }
        stepNumber={3}
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
            <Box
              sx={{
                backgroundColor: "#141414",
                padding: 3,
                borderRadius: "14px",
              }}
            >
              <Typography
                sx={{ my: 4, color: "text.secondary" }}
                variant="p"
                component={"span"}
                gutterBottom
              >
                Your current Shopify plan:
              </Typography>
              <Typography
                sx={{ color: "#0db7ba ", ml: 2, fontWeight: "bold" }}
                variant="p"
                component={"span"}
                gutterBottom
              >
                Trial
              </Typography>
              <Typography
                sx={{ color: "text.secondary" }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                When successfully subscribed to a Shopify plan, press{" "}
                <b>Submit</b>.
              </Typography>
              {planError && (
                <Typography
                  sx={{ color: "red" }}
                  variant="p"
                  component={"p"}
                  gutterBottom
                >
                  Please purhcase a subscription plan!
                </Typography>
              )}
            </Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button
                onClick={handleBack}
                color="primary"
                variant="contained"
                sx={{ mt: 2 }}
              >
                Back
              </Button>
              <Button
                onClick={checkPlan}
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
