import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/connection.js";
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware.js";
import urlRoutes from "./routes/urlRoutes.js";

config();
connectDB();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

app.use("/", urlRoutes);

app.use(errorHandlerMiddleware);

let server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}: http://localhost:${PORT}`);
});

// Handle unhandled promise rejections (e.g., database connection errors)
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Rejection: ${err.name} | ${err.message}`);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await disconnectDB();
  process.exit(1);
});

// Graceful shutdown on SIGTERM
process.on("SIGTERM", async () => {
  console.error("SIGTERM received. Shutting down gracefully...");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
