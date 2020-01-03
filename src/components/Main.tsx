import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';

import Window from './Window';
import initialState from '../store/initialState';
import reducer from '../store/reducer';
import theme from '../theme/theme';
import getPreview from '../streaming/getPreview';
import fileProcessor from '../streaming/fileProcessor';
import { setSource } from '../store/actions';

const initializedState = initialState();

const Main = () => {
	// Set up app state
	const [state, dispatch] = React.useReducer(reducer, initializedState);

	const fileInputHandler = async (file: File) => {
		const { data, errors, meta } = await getPreview(file);
		dispatch(setSource(data, file));
	};

	const processFile = () =>
		state.sourceFile &&
		fileProcessor(state.sourceFile, {
			columns: state.columns,
			filters: state.filters,
			transforms: state.transforms
		});

	return (
		<ThemeProvider theme={theme}>
			<Window
				state={state}
				dispatch={dispatch}
				processFile={processFile}
				handleFileInput={fileInputHandler}
			/>
		</ThemeProvider>
	);
};

export default Main;
