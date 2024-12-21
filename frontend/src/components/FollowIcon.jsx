import React from "react";
import { Box } from "@mui/material";
import { ListCheck } from "lucide-react";

const FollowIcon = () => {
  return (
    <Box
      sx={{
        borderRadius: "100%",
        width: "50px",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0e0e0f",
        color: "white",
        fontSize: "20px",
        fontWeight: "bold",
        border: "1px solid #383838",
      }}
    >
      <ListCheck />
    </Box>
  );
};

export default FollowIcon;
