import React, { createContext, useContext, useState } from "react";
import Step1Container from "../containers/Step1Container";
import ShopifyConfigForm from "../containers/ShopifyConfigForm";

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
    component: <Step1Container />,
  },
  {
    label: "Customisation",
    description: `Selecting your niche and your color scheme.`,
    component: <Step1Container />,
  },
  {
    label: "Store access",
    description: `Removing password protection to allow cutomers access.`,
    component: <Step1Container />,
  },
  {
    label: "Zendrop integration (Optional)",
    description: `Zendrop integration (Optional)
Integrating Zendrop to facilitate your orders fulfilment.`,
    component: <Step1Container />,
  },
];

// Create Context
const StepperContext = createContext();

// Provider Component
export const StepperProvider = ({ children }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [createdStore, setCreatedStore] = useState(false);

  const handleNext = () => {
    // Mark current step as completed before moving to next
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep]);
    }

    setActiveStep((prevActiveStep) =>
      prevActiveStep < steps.length - 1 ? prevActiveStep + 1 : prevActiveStep
    );
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep > 0 ? prevActiveStep - 1 : prevActiveStep
    );
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
