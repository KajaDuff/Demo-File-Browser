export interface ApiResponse {
  currentDirName: string;
  currentDirPath: string;
  parentDirPath: string;
  contents: Contents[] | undefined;
}

export interface Contents {
  name: string;
  type: FileTypeEnum;
  filePath: string;
}

export enum FileTypeEnum {
  Directory = "directory",
  File = "file",
}
