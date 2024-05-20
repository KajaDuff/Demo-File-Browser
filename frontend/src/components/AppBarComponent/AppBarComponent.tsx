import { Box, AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material'

const AppBarComponent: React.FC = () => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column' }}>
			<MuiAppBar component="nav" sx={{ alignItems: 'center', justifyContent: 'center' }}>
				<Typography variant="h6" component="div" sx={{ flexGrow: 1, margin: '0.5rem' }}>
					Demo File Browser
				</Typography>
			</MuiAppBar>
			<Toolbar />
		</Box>
	)
}

export default AppBarComponent
