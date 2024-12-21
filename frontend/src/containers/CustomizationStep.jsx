import React, { useState } from "react";
import StepDescriptionCard from "../components/StepDescriptionCard";
import {
  CardContent,
  Typography,
  Box,
  Stack,
  Button,
  Card,
  CardHeader,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import { LoadingButton } from "@mui/lab";
import { toast } from "react-toastify";
import { useStepper } from "../context/stepperContext";

const colors = ["black", "green", "red"];
const niches = [
  { label: "Fitness And Gym", value: "fitnessAndGym" },
  { label: "Beauty", value: "beauty" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Pets", value: "pets" },
  { label: "Toys and Babies", value: "toysAndBabies" },
  { label: "Smart Gadgets", value: "smartgadgets" },
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const CustomizationStep = () => {
  const { handleNext, handleBack } = useStepper();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    niche: "",
    colorScheme: "",
  });
  const shopifyConfig = JSON.parse(localStorage.getItem("shopifyConfig"));

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createTheme = async () => {
    const response = await fetch(`${BACKEND_URL}/api/create-theme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        storeUrl: `https://${shopifyConfig?.storeName}/admin/api/2024-10/graphql.json`,
        accessToken: shopifyConfig?.accessToken,
      }),
    });
    const data = await response.json();
    return data;
  };

  const publishTheme = async (themeId) => {
    const response = await fetch(`${BACKEND_URL}/api/publish-theme`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        themeId: themeId,
        storeUrl: `https://${shopifyConfig?.storeName}/admin/api/2024-10/graphql.json`,
        accessToken: shopifyConfig?.accessToken,
      }),
    });

    const publishData = await response.json();
    return publishData;
  };

  const getCollectionId = async () => {
    const response = await fetch(`${BACKEND_URL}/api/get-collection-id`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeUrl: `https://${shopifyConfig?.storeName}/admin/api/2024-10/graphql.json`,
        accessToken: shopifyConfig?.accessToken,
      }),
    });
    const collectionData = await response.json();
    return collectionData;
  };

  const getPublicationId = async () => {
    const response = await fetch(`${BACKEND_URL}/api/getPublicationId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeUrl: `https://${shopifyConfig?.storeName}/admin/api/2024-10/graphql.json`,
        accessToken: shopifyConfig?.accessToken,
      }),
    });
    const collectionData = await response.json();
    return collectionData?.publicationId;
  };

  const publishProduct = async (productId, publicationId) => {
    const response = await fetch(`${BACKEND_URL}/api/publishProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storeUrl: `https://${shopifyConfig?.storeName}/admin/api/2024-10/graphql.json`,
        accessToken: shopifyConfig?.accessToken,
        productId: productId,
        publicationId: publicationId,
      }),
    });
    const publishedData = await response.json();
    return publishedData?.message;
  };

  const createProduct = async (collectionId) => {
    const response = await fetch(`${BACKEND_URL}/api/create-product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        niche: formData?.niche,
        storeUrl: `https://${shopifyConfig?.storeName}/admin/api/2024-10/graphql.json`,
        accessToken: shopifyConfig?.accessToken,
        collectionId: collectionId,
      }),
    });
    const productData = await response.json();
    return productData;
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      const createdTheme = await createTheme();
      if (createdTheme?.theme?.id) {
        await delay(100000);

        const publishData = await publishTheme(createdTheme?.theme?.id);
        if (publishData?.theme?.id) {
          const collectionData = await getCollectionId();
          const publicationId = await getPublicationId();
          if (collectionData?.collectionId) {
            const productData = await createProduct(
              collectionData?.collectionId
            );
            const productsPromises = productData?.productIds?.map(
              async (product) => {
                const message = await publishProduct(product, publicationId);
                return message;
              }
            );
            const results = await Promise.all(productsPromises);
            if (results?.length > 0) {
              toast.success("Your store has been created successfully!");
              handleNext();
            }
          }
        }
      } else {
        throw new Error(data?.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <StepDescriptionCard
        stepTitle={"Customisation"}
        stepDescription={
          "Choose your niche and color scheme, and let our expertise weave them into a stunning online store tailored just for you. Together, we'll craft a digital storefront that not only reflects ypur unique vision but also captivates your audience, ensuring a memorable shopping experience from click to checkout. "
        }
        stepNumber={4}
      />
      <Box marginY={4}>
        <form onSubmit={handleSubmit} action="">
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Follow the steps
              </Typography>

              <Card sx={{ my: 2 }} variant="outlined">
                <Box
                  sx={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                    padding: "10px 16px",
                    backgroundColor: "#1e1e1f",
                  }}
                >
                  <Typography>Select your niche</Typography>
                </Box>
                <CardContent sx={{ padding: "24px !important" }}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="niche"
                      onChange={handleChange}
                    >
                      {niches?.map((niche) => (
                        <FormControlLabel
                          key={niche?.value}
                          value={niche?.value}
                          control={
                            <Radio sx={{ padding: "0", marginRight: "10px" }} />
                          }
                          label={niche?.label}
                          sx={{
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            my: 1,
                            textTransform: "capitalize",
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
              <Card variant="outlined">
                <Box
                  sx={{
                    borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
                    padding: "10px 16px",
                    backgroundColor: "#1e1e1f",
                  }}
                >
                  <Typography>Select your color scheme</Typography>
                </Box>
                <CardContent sx={{ padding: "24px !important" }}>
                  <FormControl>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="colorScheme"
                      onChange={handleChange}
                    >
                      {colors?.map((color) => (
                        <FormControlLabel
                          key={color}
                          value={color}
                          control={
                            <Radio sx={{ padding: "0", marginRight: "10px" }} />
                          }
                          label={color}
                          sx={{
                            border: "1px solid rgba(255, 255, 255, 0.12)",
                            padding: "10px 15px",
                            borderRadius: "8px",
                            my: 1,
                            textTransform: "capitalize",
                          }}
                        />
                      ))}
                    </RadioGroup>
                  </FormControl>
                </CardContent>
              </Card>
              <Stack gap={4} my={4} alignItems={"center"}>
                <Typography color="text.secondary" component={"p"}>
                  Press the button to start the building process.
                </Typography>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  loading={loading}
                  sx={{ maxWidth: 400 }}
                >
                  Build my store
                </LoadingButton>
                <Typography
                  color="text.secondary"
                  component={"p"}
                  textAlign={"center"}
                >
                  Please note that the customer reviews displayed on your store
                  are generated by artificial intelligence and do not represent
                  authentic feedback from real customers. These AI-generated
                  reviews are designed for demonstration purposes only and
                  should not be cosnidered as genuine user testimonials.
                </Typography>
              </Stack>
              <Stack direction={"row"} justifyContent={"space-between"}>
                <Button
                  onClick={handleBack}
                  color="primary"
                  variant="contained"
                  sx={{ mt: 2 }}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" sx={{ mt: 2 }}>
                  Next
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </form>
      </Box>
    </div>
  );
};

export default CustomizationStep;
