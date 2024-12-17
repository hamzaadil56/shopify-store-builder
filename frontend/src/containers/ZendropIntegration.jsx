import React, { useState } from "react";
import {
  Card,
  CardContent,
  Stack,
  Button,
  Box,
  Typography,
} from "@mui/material";

const ZendropIntegration = () => {
  const [integrationCompleted, setIntegrationCompleted] = useState(false);

  const handleCreateAccount = () => {
    // Open Zendrop account creation link
    window.open("https://zendrop.sjv.io/Qy5gYa", "_blank");
    setIntegrationCompleted(true);
  };

  const handleSkipStep = () => {
    setIntegrationCompleted(true);
  };

  const handleDone = () => {
    setIntegrationCompleted(true);
  };

  if (integrationCompleted) {
    return (
      <Card>
        <CardContent sx={{ textAlign: "center" }}>
          <Typography variant="h5" color="primary" gutterBottom>
            Congratulations!
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary", mb: 2 }}>
            You have successfully built your new store!
          </Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom sx={{ fontSize: 20 }}>
            Zendrop Integration (Optional)
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: 16 }}
            variant="body2"
          >
            Although this step is optional, we still recommend that you follow
            our guidance on how to install and connect Zendrop app to your
            store. They are experts in order fulfillment and they take care of
            the logistics for you, ensuring fast delivery and customer
            satisfaction, so you can focus on growing your business.
          </Typography>
          <Stack alignItems={"center"}>
            <Button
              onClick={handleCreateAccount}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create a Zendrop Account
            </Button>
            <Button
              onClick={handleSkipStep}
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Skip this step
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </div>
  );
};

export default ZendropIntegration;
