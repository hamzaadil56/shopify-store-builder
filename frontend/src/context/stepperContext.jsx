import React, { createContext, useContext, useState } from "react";
import Step1Container from "../containers/Step1Container";
import ShopifyConfigForm from "../containers/ShopifyConfigForm";
import SubscriptionStep from "../containers/SubscriptionStep";
import CustomizationStep from "../containers/CustomizationStep";
import StoreAccess from "../containers/StoreAccess";
import ZendropIntegration from "../containers/ZendropIntegration";

// Steps data
const steps = [
  {
    label: "Select campaign settings",
    description: `Using our affiliate link to create a Shopify Store.`,
    component: <Step1Container />,
  },
  {
    label: "Set Access Scopes",
    description: "Setting API scopes and giving store name and access token.",
    component: <ShopifyConfigForm />,
  },
  {
    label: "Shopify subscription",
    description: `Subscribing to a Shopify Basic plan.`,
    component: <SubscriptionStep />,
  },
  {
    label: "Customisation",
    description: `Selecting your niche and your color scheme.`,
    component: <CustomizationStep />,
  },
  {
    label: "Store access",
    description: `Removing password protection to allow cutomers access.`,
    component: <StoreAccess />,
  },
  {
    label: "Zendrop integration (Optional)",
    description: `Zendrop integration (Optional)
Integrating Zendrop to facilitate your orders fulfilment.`,
    component: <ZendropIntegration />,
  },
];

// Create Context
const StepperContext = createContext();

// Provider Component
export const StepperProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [createdStore, setCreatedStore] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : prevProgress + 20
    );
  };

  const handleDecrease = () => {
    setProgress((prevProgress) => (prevProgress <= 0 ? 0 : prevProgress - 20));
  };

  const handleNext = () => {
    // Mark current step as completed before moving to next
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }

    setActiveStep((prevActiveStep) =>
      prevActiveStep < steps.length - 1 ? prevActiveStep + 1 : prevActiveStep
    );
    handleIncrease();
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep > 0 ? prevActiveStep - 1 : prevActiveStep
    );
    handleDecrease();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompletedSteps([]);
  };

  const markStepAsCompleted = (stepIndex) => {
    if (!completedSteps.includes(stepIndex)) {
      setCompletedSteps([...completedSteps, stepIndex]);
    }
  };

  const handleCreatedStore = () => {
    setCreatedStore(true);
  };

  return (
    <StepperContext.Provider
      value={{
        createdStore,
        steps,
        progress,
        activeStep,
        completedSteps,
        handleCreatedStore,
        handleNext,
        handleBack,
        handleReset,
        markStepAsCompleted,
      }}
    >
      {children}
    </StepperContext.Provider>
  );
};

// Custom Hook
export const useStepper = () => {
  const context = useContext(StepperContext);

  if (!context) {
    throw new Error("useStepper must be used within a StepperProvider");
  }

  return context;
};
