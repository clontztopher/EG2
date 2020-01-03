import { State } from '../types';

const initialState = (): State => ({
	sourceFile: undefined,
	addedDate: new Date(),
	columns: [],
	filters: [
		[
			{
				fn: 'includes',
				val: '@gmail',
				attr: 'email'
			}
		]
	],
	transforms: []
});

export default initialState;
