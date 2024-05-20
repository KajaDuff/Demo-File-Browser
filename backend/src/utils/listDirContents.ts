import fs from "node:fs";
import path from "path";
import { FileTypeEnum } from "../types/response";

export const listFilesAndDirectories = async (directoryPath: string) => {
  try {
    const files = await fs.promises.readdir(directoryPath);

    const statsPromises = files.map(async (file) => {
      const filePath = path.join(directoryPath, file);
      const stats = await fs.promises.lstat(filePath);
      const type: FileTypeEnum = stats.isDirectory()
        ? FileTypeEnum.Directory
        : FileTypeEnum.File;

      return {
        name: file,
        type,
        filePath,
      };
    });

    const stats = await Promise.all(statsPromises);

    return stats;
  } catch (err: unknown) {
    console.error("Error reading directory:", err);
    throw new Error();
  }
};
