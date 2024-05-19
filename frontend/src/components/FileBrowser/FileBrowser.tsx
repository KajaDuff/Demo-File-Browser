'use client'

import { useCallback, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Typography } from '@mui/material'

import { getDirectoryContents } from '@/api/api'
import { Table } from '@/components/Table/Table'
import { ApiResponse } from '@/types/response'

export const FileBrowser: React.FC = () => {
	const router = useRouter()
	const urlPath = usePathname()
	const [data, setData] = useState<ApiResponse | undefined>(undefined)

	const fetchData = useCallback(
		async (filePath: string): Promise<void> => {
			try {
				const directoryContents = await getDirectoryContents({ filePath })
				setData(directoryContents)
			} catch (error: any) {
				// TODO: move to constants
				router.push('/error')
			}
		},
		[router]
	)

	// fetch defaultdirectory content
	useEffect(() => {
		fetchData(urlPath)
	}, [fetchData, router, urlPath])

	// fetch content based on selcted directory
	const handleRowClick = useCallback(
		(path: string) => {
			if (!path) return
			router.replace(path)
		},
		[router]
	)
	if (!data?.contents) return
	return (
		<>
			<Typography variant="h4">{`Current directory: ${data.currentDirName}`}</Typography>
			<Table data={data.contents} onRowClick={handleRowClick} backPath={data.parentDirPath} />
		</>
	)
}
