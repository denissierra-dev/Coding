import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.js";
import { authRouter } from "./routes/auth.js";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/auth", authRouter);

app.use((_req, res) => {
  res.status(404).json({ error: "Not found" });
});
