import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Info } from "lucide-react";

const CustomBadge = ({ step }) => {
  return (
    <Stack
      direction={"row"}
      gap={2}
      sx={{
        border: "1px solid #383838",
        borderRadius: "10px",
        backgroundColor: "#141414",
        padding: "10px",
        maxWidth: "fit-content",
        mb: 2,
      }}
    >
      <Info />
      <Typography component={"p"}>{step}</Typography>
    </Stack>
  );
};

export default CustomBadge;
