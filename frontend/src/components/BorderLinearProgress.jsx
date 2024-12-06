import React, { useState } from "react";
import { LinearProgress, Box, Typography, Button, Stack } from "@mui/material";
import { useStepper } from "../context/stepperContext";

const LinearProgressWithLabel = () => {
  const { progress } = useStepper();

  return (
    <Box sx={{ width: "100%", maxWidth: 500 }}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={
                progress < 30 ? "error" : progress < 60 ? "warning" : "success"
              }
              sx={{ height: 10, borderRadius: 5 }}
            />
          </Box>
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">
              {`${Math.round(progress)}%`}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default LinearProgressWithLabel;
