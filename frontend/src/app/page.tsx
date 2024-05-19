'use client'

import { useEffect } from 'react'

import { useRouter } from 'next/navigation'

import { getDirectoryContents } from '@/api/api'

export default function Home() {
	const router = useRouter()

	useEffect(() => {
		// fetch default directory content
		const fetchData = async (filePath: string): Promise<void> => {
			try {
				const directoryContents = await getDirectoryContents({
					filePath,
				})
				router.replace(directoryContents.currentDirPath)
			} catch (error: any) {
				router.push('/error')
			}
		}
		fetchData(process.cwd())
	}, [router])
	return <></>
}
