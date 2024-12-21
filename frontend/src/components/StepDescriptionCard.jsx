import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CustomBadge from "./CustomBadge";

const card = <React.Fragment></React.Fragment>;

export default function StepDescriptionContainer({
  stepTitle,
  stepDescription,
  stepNumber,
}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        {" "}
        <CardContent>
          <CustomBadge step={`Step ${stepNumber}`} />
          <Typography gutterBottom sx={{ fontSize: 20, mb: 2 }}>
            {stepTitle}
          </Typography>

          <Typography
            sx={{ color: "text.secondary", fontSize: 16 }}
            variant="body2"
          >
            {stepDescription}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
