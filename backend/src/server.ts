import express, {
  type NextFunction,
  type Request,
  type Response,
} from "express";

import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import { PORT } from "./constants/env";
import { ApiRequest } from "./types/request";
import { ApiResponse } from "./types/response";
import { listFilesAndDirectories } from "./utils/listDirContents";

dotenv.config();

const app = express();

app.use(express.json({ limit: "50mb" }));

// enable CORS for development
app.use(
  cors({
    origin: "*",
  })
);

app.post("/", async (req: Request<ApiRequest>, res: Response<ApiResponse>) => {
  const { filePath } = req.body;

  const filePathDecoded = decodeURI(filePath);

  // project root dir is parent of BE directory
  const rootDir = path.dirname(process.cwd());
  const currentDirPath =
    filePathDecoded === "/" ? rootDir : (filePathDecoded as string);
  const parentDirPath = path.dirname(currentDirPath);
  const dirName = currentDirPath.split("/").pop() as string;

  try {
    const contents = await listFilesAndDirectories(currentDirPath);
    const response: ApiResponse = {
      currentDirName: dirName,
      currentDirPath,
      parentDirPath,
      contents,
    };

    res.status(200).json(response);
  } catch {
    (err: Error) => {
      console.log(err);
      res.status(500);
    };
  }
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
