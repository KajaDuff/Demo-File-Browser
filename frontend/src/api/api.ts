import axios from 'axios'

import { NEXT_PUBLIC_BASE_API_URL } from '@/constants/env'
import { ApiRequest } from '@/types/request'
import { ApiResponse } from '@/types/response'

import { axiosInstance } from './axios'

export async function getDirectoryContents(requestBody: ApiRequest): Promise<ApiResponse> {
	try {
		const { data } = await axiosInstance.post<ApiResponse>(NEXT_PUBLIC_BASE_API_URL, requestBody)
		return data
	} catch (error) {
		console.error('Failed to fetch directory contents:', error)

		// If the error is an AxiosError, provide more details
		if (axios.isAxiosError(error)) {
			throw new Error(`API error: ${error.response?.status} ${error.response?.statusText}`)
		} else {
			throw new Error('An unexpected error occurred')
		}
	}
}
