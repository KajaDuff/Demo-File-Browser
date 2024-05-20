import { Container } from '@mui/material'

import { AppBar } from '@/components/AppBar/AppBar'
import { FileBrowser } from '@/components/FileBrowser/FileBrowser'

export default function BrowserPage() {
	return (
		<main>
			<AppBar />
			<Container fixed maxWidth="md">
				<FileBrowser />
			</Container>
		</main>
	)
}
