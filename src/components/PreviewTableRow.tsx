import * as React from 'react';
import {
	TableRow,
	TableCell,
	FormControl,
	Select,
	InputLabel,
	MenuItem,
	TextField
} from '@material-ui/core';

import { Action } from '../store/reducer';
import { ColumnTypes, Column } from '../types';
import { updateColType, updateColName } from '../store/actions';

interface PreviewTableProps {
	col: Column;
	dispatch: React.Dispatch<Action>;
}

const PreviewTableRow = ({ col, dispatch }: PreviewTableProps) => {
	const handleColChange = (e: React.ChangeEvent<{ value: unknown }>) =>
		dispatch(updateColType(col.index, e.target.value as ColumnTypes));

	const handleNameChange = (e: React.ChangeEvent<{ value: unknown }>) =>
		dispatch(updateColName(col.index, e.target.value as string));

	return (
		<TableRow key={`data${col.index}`}>
			<TableCell>{col.index}</TableCell>
			<TableCell>
				{col.type !== ColumnTypes.IGNORE ? (
					<TextField
						label="Name"
						value={col.name || col.name}
						onChange={handleNameChange}
					/>
				) : (
					col.name
				)}
			</TableCell>
			<TableCell>
				<FormControl>
					<Select
						autoWidth
						value={col ? col.type : ColumnTypes.IGNORE}
						onChange={handleColChange}
					>
						<InputLabel id={`input-${col.index}`}>Type</InputLabel>
						<MenuItem value={ColumnTypes.IGNORE}>Ignore</MenuItem>
						<MenuItem value={ColumnTypes.DATE}>Date</MenuItem>
						<MenuItem value={ColumnTypes.EMAIL}>Email</MenuItem>
						<MenuItem value={ColumnTypes.NUMBER}>Number</MenuItem>
						<MenuItem value={ColumnTypes.STRING}>String</MenuItem>
					</Select>
				</FormControl>
			</TableCell>
		</TableRow>
	);
};

export default PreviewTableRow;
