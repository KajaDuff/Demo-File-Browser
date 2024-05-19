import { FileBrowser } from '@/components/FileBrowser/FileBrowser'
import { Container, Typography } from '@mui/material'

export default function PageBrowser() {
  return (
    <main>
      <Container fixed maxWidth="md">
        <div>
          <Typography variant="h3">Welcome to demo file browser</Typography>
        </div>
        <FileBrowser />
      </Container>
    </main>
  )
}
