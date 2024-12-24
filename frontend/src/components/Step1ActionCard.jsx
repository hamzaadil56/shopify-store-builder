import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Stack, Button, Paper } from "@mui/material";
import { Info } from "lucide-react";
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
          <Typography sx={{ color: "text.secondary", fontSize: 16 }}>
            Once your store created, come back on this page and press Next.
          </Typography>

          <Typography
            variant="body2"
            sx={{ color: "text.secondary", fontSize: 16, my: 4 }}
          >
            Please note that you must create a new store using our link. Our AI
            Store Builder doesn't work with pre-existing stores.
          </Typography>

          <Paper
            elevation={3}
            sx={{
              p: 2,
              mb: 3,
              bgcolor: "#141414",
              borderRadius: 1,
            }}
          >
            <Stack direction="row" spacing={1} alignItems="center" gap={2}>
              <Box display={"flex"} alignItems={"center"}>
                <Info size={24} color="rgb(25, 165, 242)" />
              </Box>
              <Typography
                sx={{
                  color: "rgb(25, 165, 242)",
                  fontWeight: 500,
                }}
              >
                Creating your store takes only 1 minute and is free.
              </Typography>
            </Stack>
          </Paper>

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
