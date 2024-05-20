'use client'

import { useCallback, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { Paper } from '@mui/material'

import { getDirectoryContents } from '@/api/api'
import { Table } from '@/components/Table/Table'
import { ApiResponse } from '@/types/response'

import BreadcrumbsComponent from '../Breadcrumbs/Breadcrumbs'

export const FileBrowser: React.FC = () => {
	const router = useRouter()
	const urlPath = usePathname()
	const [data, setData] = useState<ApiResponse | null>(null)

	const fetchData = useCallback(
		async (filePath: string) => {
			try {
				const directoryContents = await getDirectoryContents({ filePath })
				setData(directoryContents)
			} catch (error) {
				console.error('Failed to fetch directory contents:', error)
				router.push('/error')
			}
		},
		[router]
	)

	useEffect(() => {
		fetchData(urlPath)
	}, [fetchData, urlPath])

	const handleRowClick = useCallback(
		(path: string) => {
			if (!path) return
			router.replace(path)
		},
		[router]
	)

	if (!data?.contents) return null

	return (
		<>
			<BreadcrumbsComponent />
			<Paper>
				<Table data={data.contents} onRowClick={handleRowClick} backPath={data.parentDirPath} />
			</Paper>
		</>
	)
}
