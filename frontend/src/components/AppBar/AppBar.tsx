import { Box, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'

export const AppBar = () => {
	return (
		<Box sx={{ display: 'flex' }}>
			<MuiAppBar component="nav" sx={{ alignItems: 'center', justifyContent: 'center' }}>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, margin: '0.5rem' }}>
					Demo File Browser
				</Typography>
			</MuiAppBar>
			<Toolbar />
		</Box>
	)
}
