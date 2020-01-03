import * as React from 'react';
import {
	Typography,
	Table,
	TableHead,
	TableBody,
	TableCell,
	TableContainer,
	TableRow
} from '@material-ui/core';
import { Action } from '../store/reducer';
import PreviewTableRow from './PreviewTableRow';
import { Column } from '../types';

interface PreviewProps {
	cols: Column[];
	dispatch: React.Dispatch<Action>;
}

const PreviewTable = ({ dispatch, cols }: PreviewProps) => {
	return cols.length > 0 ? (
		<TableContainer>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>
							<Typography>Index</Typography>
						</TableCell>
						<TableCell>
							<Typography>Name</Typography>
						</TableCell>
						<TableCell>
							<Typography>Type</Typography>
						</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{cols.map((col: Column, i: number) => (
						<PreviewTableRow col={col} dispatch={dispatch} key={i} />
					))}
				</TableBody>
			</Table>
		</TableContainer>
	) : null;
};

export default PreviewTable;
