import { State, ColumnTypes, Column } from '../types';
import { ActionTypes } from '../types';
export interface Action {
	type: string;
	payload?: any;
}

export type Reducer = (state: State, action: Action) => State;

const reducer: Reducer = (state, action) => {
	switch (action.type) {
		case ActionTypes.SET_SOURCE: {
			const { file, data } = action.payload;
			return {
				...state,
				sourceFile: file,
				addedDate: new Date(),
				columns: data[0].map((colName: string, i: number) => ({
					type: ColumnTypes.IGNORE,
					name: colName,
					index: i
				}))
			};
		}
		case ActionTypes.UPDATE_COLTYPE: {
			const { idx, type } = action.payload;
			return {
				...state,
				columns: updateAtIndex(idx, 'type', type, state.columns)
			};
		}
		case ActionTypes.UPDATE_COLNAME: {
			const { idx, name } = action.payload;
			return {
				...state,
				columns: updateAtIndex(idx, 'name', name, state.columns)
			};
		}
		default:
			return state;
	}
};

const updateAtIndex = (
	idx: number,
	prop: string,
	val: any,
	collection: any[]
) =>
	collection.map((member, i) => {
		if (idx === i) member[prop] = val;
		return member;
	});

export default reducer;
