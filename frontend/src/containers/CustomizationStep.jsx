import React from "react";
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

const CustomizationStep = () => {
  return (
    <div>
      <StepDescriptionCard
        stepTitle={"Customisation"}
        stepDescription={
          "Choose your niche and color scheme, and let our expertise weave them into a stunning online store tailored just for you. Together, we'll craft a digital storefront that not only reflects ypur unique vision but also captivates your audience, ensuring a memorable shopping experience from click to checkout. "
        }
      />
      <Box marginY={4}>
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
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Fitness and Gym"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Toys and Babies"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Pet Supplies"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Beauty"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Pick a niche for me"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
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
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      value="female"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Blue"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="male"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Green"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Yellow"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Purple"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
                    <FormControlLabel
                      value="other"
                      control={
                        <Radio sx={{ padding: "0", marginRight: "10px" }} />
                      }
                      label="Grey"
                      sx={{
                        border: "1px solid rgba(255, 255, 255, 0.12)",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        my: 1,
                      }}
                    />
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
              <Typography color="text.secondary" component={"p"} textAlign={'center'}>
                Please note that the customer reviews displayed on your store
                are generated by artificial intelligence and do not represent
                authentic feedback from real customers. These AI-generated
                reviews are designed for demonstration purposes only and should
                not be cosnidered as genuine user testimonials.
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
      </Box>
    </div>
  );
};

export default CustomizationStep;
