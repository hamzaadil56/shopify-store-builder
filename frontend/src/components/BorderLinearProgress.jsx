import React, { useState } from "react";
import { LinearProgress, Box, Typography, Button, Stack } from "@mui/material";

const LinearProgressWithLabel = () => {
  const [progress, setProgress] = useState(0);

  const handleIncrease = () => {
    setProgress((prevProgress) =>
      prevProgress >= 100 ? 0 : prevProgress + 10
    );
  };

  const handleDecrease = () => {
    setProgress((prevProgress) => (prevProgress <= 0 ? 0 : prevProgress - 10));
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 400 }}>
      <Stack spacing={2}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Box sx={{ width: "100%", mr: 1 }}>
            <LinearProgress
              variant="determinate"
              value={progress}
              color={
                progress < 30 ? "error" : progress < 60 ? "warning" : "success"
              }
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
