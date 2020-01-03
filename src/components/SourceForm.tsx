import * as React from 'react';
import { makeStyles, Button, Typography, Grid } from '@material-ui/core';

interface SourceFormProps {
	sourceFile?: File;
	handleFileInput: (file: File) => void;
}

const useStyles = makeStyles(theme => ({
	hiddenInput: {
		display: 'none'
	}
}));

const SourceForm = ({ sourceFile, handleFileInput }: SourceFormProps) => {
	const classes = useStyles();
	const fileInput = React.useRef<HTMLInputElement>(null);

	const handleInput = () => {
		const files = fileInput.current?.files;
		if (files) {
			handleFileInput(files[0]);
		}
	};

	return (
		<Grid container>
			<Grid item xs={6}>
				<Typography variant="h6">
					File: {sourceFile?.name || `File Name`}
				</Typography>
			</Grid>
			<Grid item xs={6}>
				<input
					type="file"
					ref={fileInput}
					onChange={handleInput}
					className={classes.hiddenInput}
				/>
				<Button
					variant="contained"
					color="primary"
					onClick={() => fileInput.current?.click()}
				>
					Select Source
				</Button>
			</Grid>
		</Grid>
	);
};

export default SourceForm;
