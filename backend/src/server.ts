import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./constants/env";
import { ApiRequest } from "./types/request";
import { ApiResponse } from "./types/response";
import { listFilesAndDirectories } from "./utils/listDirContents";

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware configuration
app.use(express.json({ limit: "50mb" }));

// Enable CORS for development
app.use(cors({ origin: "*" }));

// Route handlers
app.post(
  "/",
  async (
    req: Request<{}, {}, ApiRequest>,
    res: Response<ApiResponse | { error: string }>
  ) => {
    const { filePath } = req.body;
    const filePathDecoded = decodeURI(filePath);

    // Project root dir is parent of BE directory
    const rootDir = path.resolve(__dirname, "..");
    const currentDirPath = filePathDecoded === "/" ? rootDir : filePathDecoded;
    const parentDirPath = path.dirname(currentDirPath);
    const dirName = path.basename(currentDirPath);

    try {
      const contents = await listFilesAndDirectories(currentDirPath);
      const response: ApiResponse = {
        currentDirName: dirName,
        currentDirPath,
        parentDirPath,
        contents,
      };
      res.status(200).json(response);
    } catch (err) {
      console.error("Error listing directory contents:", err);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

// Default 404 handler
app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).send("NOT FOUND");
});

// Default exception handler to prevent the app from breaking
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Unhandled error:", err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});
