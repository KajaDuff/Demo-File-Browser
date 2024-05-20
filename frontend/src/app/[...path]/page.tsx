import { Container } from '@mui/material'

import AppBarComponent from '@/components/AppBarComponent/AppBarComponent'
import { FileBrowser } from '@/components/FileBrowser/FileBrowser'

export default function BrowserPage() {
	return (
		<main>
			<AppBarComponent />
			<Container fixed maxWidth="md">
				<FileBrowser />
			</Container>
		</main>
	)
}
