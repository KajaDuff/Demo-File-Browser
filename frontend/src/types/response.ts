export interface ApiResponse {
	contents: Contents[] | undefined
	currentDirName: string
	currentDirPath: string
	parentDirPath: string
}

export interface Contents {
	[key: string]: string | number | boolean
	filePath: string
	name: string
	type: FileTypeEnum
}

export enum FileTypeEnum {
	Directory = 'directory',
	File = 'file',
}
