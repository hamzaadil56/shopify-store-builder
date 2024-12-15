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
import FormLabel from "@mui/material/FormLabel";

const colors = ["black", "green", "red"];
const niches = [
  { label: "Fitness And Gym", value: "fitnessAndGym" },
  { label: "Beauty", value: "beauty" },
  { label: "Kitchen", value: "kitchen" },
];

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CustomizationStep = () => {
  const [formData, setFormData] = useState({
    niche: "",
    colorScheme: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  };
  return (
    <div>
      <StepDescriptionCard
        stepTitle={"Customisation"}
        stepDescription={
          "Choose your niche and color scheme, and let our expertise weave them into a stunning online store tailored just for you. Together, we'll craft a digital storefront that not only reflects ypur unique vision but also captivates your audience, ensuring a memorable shopping experience from click to checkout. "
        }
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
                <Button variant="contained" sx={{ maxWidth: 400 }}>
                  Build my store
                </Button>
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
        </form>
      </Box>
    </div>
  );
};

export default CustomizationStep;
