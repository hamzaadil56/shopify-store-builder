const express = require("express");
const app = express();
const cors = require("cors");
const shopRoutes = require("./routes/shopRoutes");

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

app.use(express.json());

// Routes
app.use("/api", shopRoutes);

// Global error handler
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     error: "Something went wrong!",
//     details: process.env.NODE_ENV === "production" ? {} : err.message,
//   });
// });

app.listen(3000, () =>
  console.log("Server running on port http://localhost:3000")
);
