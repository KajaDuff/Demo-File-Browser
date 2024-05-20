/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react'

import { usePathname } from 'next/navigation'

import { Box, Breadcrumbs, Link as MuiLink, Toolbar, Typography } from '@mui/material'

import { colors } from '@/styles'

const BreadcrumbsComponent = () => {
	const pathname = usePathname()

	const breadcrumbs = useMemo(() => {
		// Split the path into segments
		const pathSegments = pathname.split('/').filter(Boolean)
		// Helper function to create a path for each segment
		const createBreadcrumbUrl = (index: number) => {
			return '/' + pathSegments.slice(0, index + 1).join('/')
		}

		return pathSegments.map((segment, index) => {
			// Check if it's the last segment
			const isLast = index === pathSegments.length - 1
			const url = createBreadcrumbUrl(index)

			return isLast ? (
				<Typography color="text.primary" key={index}>
					{segment}
				</Typography>
			) : (
				<MuiLink
					component="a"
					underline="hover"
					color="inherit"
					variant="subtitle1"
					href={url}
					key={index}
					style={{
						padding: '0.5rem',
						zIndex: 2,
					}}
				>
					{segment}
				</MuiLink>
			)
		})
	}, [pathname])

	return (
		<>
			<Box
				sx={{
					backgroundColor: colors.backgroundLight,
					boxShadow: 1,
					left: 0,
					padding: '8px 16px',
					position: 'fixed',
					top: '50px',
					width: '100vw',
				}}
			>
				<Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
			</Box>
			<Toolbar />
		</>
	)
}

export default BreadcrumbsComponent
