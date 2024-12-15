import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const card = <React.Fragment></React.Fragment>;

export default function StepDescriptionContainer({
  stepTitle,
  stepDescription,
}) {
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card>
        {" "}
        <CardContent>
          <Typography gutterBottom sx={{ fontSize: 24 }}>
            {stepTitle}
          </Typography>

          <Typography
            sx={{ color: "text.secondary", fontSize: 18 }}
            variant="body2"
          >
            {stepDescription}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}
