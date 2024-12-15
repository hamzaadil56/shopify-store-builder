import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Stack,
  Alert,
} from "@mui/material";
import StepDescriptionCard from "../components/StepDescriptionCard";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useStepper } from "../context/stepperContext";
import { LoadingButton } from "@mui/lab";

const ShopifyStoreForm = () => {
  const { handleNext } = useStepper();
  const [formData, setFormData] = useState({
    accessToken: "",
    storeName: "",
    email: "",
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setApiResponse(null);

    try {
      setLoading(true);
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

      if (data.errors) {
        throw new Error(data.errors.map((err) => err.message).join(", "));
      }

      localStorage.setItem("shopifyConfig", JSON.stringify(formData));
      handleNext();

      setApiResponse(data);
    } catch (err) {
      setError(err.message);
      console.error("Error submitting form:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <StepDescriptionCard
        stepTitle={"Set Access Scopes"}
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
                1. At the bottom left of your store admin area, click on the
                Settings button, and then go to Apps and sales channels.
              </Typography>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                2. Click on Develop apps and click on Allow custom app
                development, and confirm. Click on Create app. Name the app
                store generator, and confirm.
              </Typography>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                3. Click on Configure Admin API scopes and tick ALL the boxes.
                It's the most difficult part and takes about a minute, but the
                reward will be great as this is going to give us all the
                permissions to build your store.
              </Typography>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                4. Once all the boxes ticked, scroll back up and press Save at
                the top right of the screen.
              </Typography>
              <Typography
                sx={{ my: 4 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                5. Now, go to API credentials, press Install app. A pop-up
                window will open to ask for a confirmation. Confirm by pressing
                Install.
              </Typography>
              <Typography
                sx={{ my: 2 }}
                variant="p"
                component={"p"}
                gutterBottom
              >
                6. We need your access token to build your store. To access it,
                click on API credentials. Click Reveal token once, and
                copy-paste the token in the input field below. Warning: you can
                see this token only once, so make sure you copy/paste it before
                leaving the screen.
              </Typography>
            </Box>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Access Token"
                name="accessToken"
                value={formData.accessToken}
                onChange={handleChange}
                margin="normal"
                helperText="Reveal token once in Shopify Admin API credentials"
                required
              />
              <TextField
                fullWidth
                label="Store Name"
                name="storeName"
                value={formData.storeName}
                onChange={handleChange}
                margin="normal"
                placeholder="76a9c1-69.myshopify.com"
                helperText="Mix of numbers and letters with a dash, followed by myshopify.com"
                required
              />
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                margin="normal"
                required
              />

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {apiResponse && (
                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6">Store Details</Typography>
                    <Typography>Email: {apiResponse.email}</Typography>
                    <Typography>Plan: {apiResponse.plan}</Typography>
                    <Typography>
                      Domain: {apiResponse.myshopifyDomain}
                    </Typography>
                    <Typography>
                      Created At:{" "}
                      {new Date(apiResponse.createdAt).toLocaleString()}
                    </Typography>
                  </CardContent>
                </Card>
              )}

              <Stack direction={"row"} justifyContent={"space-between"}>
                <Button color="primary" variant="contained" sx={{ mt: 2 }}>
                  Back
                </Button>
                <LoadingButton
                  type="submit"
                  loading={isLoading}
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default ShopifyStoreForm;
