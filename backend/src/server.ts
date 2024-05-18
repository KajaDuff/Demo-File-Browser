// src/index.js
import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";
import fs from "node:fs";
import dotenv from "dotenv";
import { PORT } from "./constants/env";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  // Function to get current filenames
  // in directory
  fs.readdir(__dirname, (err, files) => {
    if (err) console.log(err);
    else {
      console.log("\nCurrent directory filenames:");
      files.forEach((file) => {
        console.log(file);
      });
    }
  });
  res.send("Express + TypeScript Server");
});

/**
 * Default 404 handler
 */
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("NOT FOUND");
});

/**
 * Default exception handler (that method prevent the app from broke)
 */
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  return res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
