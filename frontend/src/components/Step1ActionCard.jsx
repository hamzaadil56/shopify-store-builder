import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, Button } from "@mui/material";
import { useStepper } from "../context/stepperContext";

export default function StepActionCard() {
  const { handleNext, createdStore, handleCreatedStore } = useStepper();
  const handleCreateStore = () => {
    // Handle creating a new store
    window.open("https://shopify.pxf.io/q476kq", "_blank");
    handleCreatedStore();
  };
  return (
    <Box sx={{ minWidth: 275, mt: 4 }}>
      <Card>
        <CardContent>
          <Typography sx={{ color: "text.secondary", fontSize: 18 }}>
            Once your store created, come back on this page and press Next.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 18, my: 4 }}
          >
            Please note that you must create a new store using our link. Our AI
            Store Builder doesn't work with pre-existing stores.
          </Typography>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Button variant="contained" onClick={handleCreateStore}>
              Create Store
            </Button>

            <Button disabled={!createdStore} onClick={handleNext}>
              Next
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}
