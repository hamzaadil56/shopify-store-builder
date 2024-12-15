import {
  Card,
  CardContent,
  Stack,
  Button,
  Box,
  Typography,
} from "@mui/material";
import React from "react";

const ZendropIntegration = () => {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom sx={{ fontSize: 24 }}>
            Zendrop Integration (Optional)
          </Typography>
          <Typography
            sx={{ color: "text.secondary", fontSize: 18 }}
            variant="body2"
          >
            Although this step is optional, we still recommend that you follow
            our guidance on how to install and connect Zendrop app to ypur
            store. They are experts in order fulfillment and they take care of
            the logistics for you, emsuring fast delivery and customer
            satistfaction, so you can focus on growing your business.
          </Typography>
          <Stack alignItems={"center"}>
            <Button
              href="https://zendrop.sjv.io/Qy5gYa"
              target="_blank"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Create a Zendrop Account
            </Button>
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Skip this step
            </Button>
          </Stack>
        </CardContent>
      </Card>
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
                On your Admin Page, click on Online Store. Go to Preferences.
                Disable the box Restrict access to visitors with the password,
                and hit save at the bottom on the screen.
              </Typography>
            </Box>
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
              >
                Done
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default ZendropIntegration;
