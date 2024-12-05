import React from "react";
import { Box } from "@mui/material";
import StepDescriptionContainer from "../components/StepDescriptionCard";
import StepActionCard from "../components/Step1ActionCard";
import { useStepper } from "../context/stepperContext";

const Step1Container = () => {
  return (
    <Box sx={{ flex: 1 }}>
      <StepDescriptionContainer
        stepTitle={"Create your Store"}
        stepDescription={`Use our link below to create your online store using Shopify, it takes only 1 minute. We have a partnership with Shopify and it is important that you use this link if you want our AI to build your store. When your store is created, come back on this page and press "Next".`}
      />
      <StepActionCard />
    </Box>
  );
};

export default Step1Container;
