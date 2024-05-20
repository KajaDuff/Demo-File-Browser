import React, { useMemo } from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Box, Breadcrumbs, Link as MuiLink, Toolbar, Typography } from '@mui/material'

import { colors } from '@/styles'

const BreadcrumbsComponent: React.FC = () => {
	const pathname = usePathname()

	const breadcrumbs = useMemo(() => {
		const pathSegments = pathname.split('/').filter(Boolean)

		const createBreadcrumbUrl = (index: number) => {
			return '/' + pathSegments.slice(0, index + 1).join('/')
		}

		return pathSegments.map((segment, index) => {
			const isLast = index === pathSegments.length - 1
			const url = createBreadcrumbUrl(index)

			return isLast ? (
				<Typography color="text.primary" key={url}>
					{segment}
				</Typography>
			) : (
				<MuiLink
					component={Link}
					underline="hover"
					color="inherit"
					variant="subtitle1"
					href={url}
					key={url}
					sx={{
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
					zIndex: 1, // Ensure the zIndex is appropriate for your layout
				}}
			>
				<Breadcrumbs aria-label="breadcrumb">{breadcrumbs}</Breadcrumbs>
			</Box>
			<Toolbar />
		</>
	)
}

export default BreadcrumbsComponent
