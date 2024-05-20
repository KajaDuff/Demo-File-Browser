'use client'

import { useCallback, useEffect, useState } from 'react'

import { usePathname, useRouter } from 'next/navigation'

import { getDirectoryContents } from '@/api/api'
import { Table } from '@/components/Table/Table'
import { ApiResponse } from '@/types/response'

import BreadcrumbsComponent from '../Breadcrumbs/Breadcrumbs'

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
				router.push('/error')
			}
		},
		[router]
	)

	// fetch default directory content
	useEffect(() => {
		fetchData(urlPath)
	}, [fetchData, router, urlPath])

	// fetch content based on selected directory
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
			<BreadcrumbsComponent />
			<Table data={data.contents} onRowClick={handleRowClick} backPath={data.parentDirPath} />
		</>
	)
}
