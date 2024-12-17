import { useState } from "react";
import "./App.css";
import { Container, Typography, Box, Stack } from "@mui/material";
import StepWrapper from "./containers/StepWrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo from "./assets/makewins.svg";

function App() {
  return (
    <main>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <img src={Logo} />
        <Box my={3}>
          <Typography variant="h4" component={"h1"}>
            Welcome to the MakeWins AI Store Builder
          </Typography>
          {/* <Typography variant="h5" component={"h1"}>
            Version 1.1
          </Typography> */}
        </Box>
        <Stack
          direction={{
            sm: "column",
            md: "row",
          }}
          gap={4}
        >
          <StepWrapper />
        </Stack>
      </Container>
      <ToastContainer />
    </main>
  );
}

export default App;
