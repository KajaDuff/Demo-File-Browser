import { NEXT_PUBLIC_BASE_API_URL } from '@/constants/env'
import { ApiRequest } from '@/types/request'
import { ApiResponse } from '@/types/response'

import { axiosInstance } from './axios'

export async function getDirectoryContents(requestBody: ApiRequest) {
	try {
		const { data } = await axiosInstance.post<ApiResponse>(NEXT_PUBLIC_BASE_API_URL, requestBody)
		return data
	} catch (error) {
		console.error(error)
		throw new Error()
	}
}
