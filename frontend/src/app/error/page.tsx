import { Box, Container, Typography } from '@mui/material'

export default function ErrorPage() {
	return (
		<main>
			<Container>
				<Box sx={{ alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100vh', justifyContent: 'center' }}>
					<Typography variant="h2">Error</Typography>
					<Typography>Something went wrong</Typography>
				</Box>
			</Container>
		</main>
	)
}
