import { useState } from "react";
import "./App.css";
import { Container, Typography, Box, Stack } from "@mui/material";
import StepWrapper from "./containers/StepWrapper";

function App() {
  const [count, setCount] = useState(0);

  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Box>
          <Typography variant="h4" component={"h1"}>
            Welcome to the Ecom King AI Store Builder
          </Typography>
          <Typography variant="h5" component={"h1"}>
            Version 1.1
          </Typography>
        </Box>
        <Stack
          direction={{
            sm: "column",
            md: "row",
          }}
        >
          <StepWrapper />
        </Stack>
      </Container>
    </main>
  );
}

export default App;
