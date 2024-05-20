import { ChangeEvent, useCallback, useMemo, useState } from 'react'

import { Folder as FolderIcon, InsertDriveFile as InsertDriveFileIcon, Search as SearchIcon } from '@mui/icons-material'
import {
	Button,
	Input,
	InputAdornment,
	Table as MuiTable,
	Paper,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'

import { Contents, FileTypeEnum } from '@/types/response'

export const Table = ({ data, backPath, onRowClick }: { backPath: string; data: Contents[]; onRowClick: (path: string) => void }) => {
	const [value, setValue] = useState<string>('')

	const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value)
	}, [])

	const filteredData = useMemo(() => {
		const searchValue = value.toLowerCase()
		const filteredResult = data.filter((obj) => Object.values(obj).some((val) => String(val).toLowerCase().includes(searchValue)))
		return [...filteredResult].sort((a, b) => a.type.localeCompare(b.type))
	}, [data, value])

	const tableRows = useMemo(() => {
		return filteredData.map((row) => (
			<TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
				<TableCell align="left">{row.type === FileTypeEnum.Directory ? <FolderIcon /> : <InsertDriveFileIcon />}</TableCell>
				<TableCell component="th" scope="row">
					{row.name}
				</TableCell>
				<TableCell align="right">
					<Button disabled={row.type === FileTypeEnum.File} onClick={() => onRowClick(row.filePath)}>
						{row.type === FileTypeEnum.File ? 'View' : 'Open'}
					</Button>
				</TableCell>
			</TableRow>
		))
	}, [filteredData, onRowClick])

	return (
		<TableContainer component={Paper}>
			<MuiTable sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Type</TableCell>
						<TableCell>Name</TableCell>
						<TableCell align="right">
							<Input
								autoComplete="off"
								value={value}
								placeholder="Search..."
								startAdornment={
									<InputAdornment position="start">
										<SearchIcon />
									</InputAdornment>
								}
								onChange={onChange}
							/>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<FolderIcon />
						</TableCell>
						<TableCell>..</TableCell>
						<TableCell align="right">
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
