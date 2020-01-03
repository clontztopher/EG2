import * as React from 'react';
import {
	Container,
	Grid,
	Typography,
	makeStyles,
	Paper,
	Button
} from '@material-ui/core';

import SourceForm from './SourceForm';
import PreviewTable from './PreviewTable';
import { State } from '../types';
import { Action } from '../store/reducer';

interface WindowProps {
	state: State;
	dispatch: React.Dispatch<Action>;
	processFile: () => void;
	handleFileInput: (file: File) => Promise<any>;
}

const useStyles = makeStyles(theme => ({
	paper: {
		padding: theme.spacing(2)
	}
}));

const Window = (props: WindowProps) => {
	const classes = useStyles();
	return (
		<Container>
			{/* Outer Grid */}
			<Grid container spacing={3}>
				{/* Left Column */}
				<Grid container item xs={6} direction="column">
					{/* Source Form */}
					<Grid item>
						<Paper className={classes.paper}>
							<SourceForm
								sourceFile={props.state.sourceFile}
								handleFileInput={props.handleFileInput}
							/>
						</Paper>
					</Grid>
					{/* Source Form */}
					{/* Process Button */}
					<Grid item>
						<Paper className={classes.paper}>
							<Button
								variant="contained"
								color="primary"
								onClick={props.processFile}
							>
								Process File
							</Button>
						</Paper>
					</Grid>
					{/* Process Button */}
				</Grid>
				{/* Left Column */}
				{/* Right Column */}
				<Grid item xs={6}>
					<Paper className={classes.paper}>
						<Typography variant="h6">Columns</Typography>
						<PreviewTable
							cols={props.state.columns}
							dispatch={props.dispatch}
						/>
					</Paper>
				</Grid>
				{/* Right Column */}
			</Grid>
			{/* Outer Grid */}
		</Container>
	);
};

export default Window;
