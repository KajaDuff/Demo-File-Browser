import { useMemo } from 'react'

import { Folder as FolderIcon, InsertDriveFile as InsertDriveFileIcon } from '@mui/icons-material'
import { Button, Table as MuiTable, Paper, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'

import { Contents, FileTypeEnum } from '@/types/response'

export const Table = ({ data, backPath, onRowClick }: { backPath: string; data: Contents[]; onRowClick: (path: string) => void }) => {
	const sortedData = useMemo(() => {
		return [...data].sort((a, b) => a.type.localeCompare(b.type))
	}, [data])

	const tableRows = useMemo(() => {
		return sortedData.map((row) => {
			const icon = row.type === FileTypeEnum.Directory ? <FolderIcon /> : <InsertDriveFileIcon />

			const buttonTitle = row.type === FileTypeEnum.File ? 'View' : 'Open'
			return (
				<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
					<TableCell align="left">{icon}</TableCell>
					<TableCell component="th" scope="row">
						{row.name}
					</TableCell>
					<TableCell>{row.filePath}</TableCell>
					<TableCell>
						<Button disabled={row.type === FileTypeEnum.File} onClick={() => onRowClick(row.filePath)}>
							{buttonTitle}
						</Button>
					</TableCell>
				</TableRow>
			)
		})
	}, [onRowClick, sortedData])
	return (
		<TableContainer component={Paper}>
			<MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Type</TableCell>
						<TableCell>Name</TableCell>
						<TableCell>TO delete</TableCell>
						<TableCell></TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<FolderIcon />
						</TableCell>
						<TableCell>..</TableCell>
						<TableCell>{backPath}</TableCell>
						<TableCell>
							<Button onClick={() => onRowClick(backPath)} disabled={!backPath}>
								Back
							</Button>
						</TableCell>
					</TableRow>
					{tableRows}
				</TableBody>
			</MuiTable>
		</TableContainer>
	)
}
