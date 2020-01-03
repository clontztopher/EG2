import { ColumnTypes, ActionTypes } from '../types';

export const updateColType = (idx: number, type: ColumnTypes) => ({
	type: ActionTypes.UPDATE_COLTYPE,
	payload: { idx, type }
});

export const updateColName = (idx: number, name: string) => ({
	type: ActionTypes.UPDATE_COLNAME,
	payload: { idx, name }
});

export const setSource = (data: string[][], file: File) => ({
	type: ActionTypes.SET_SOURCE,
	payload: { data, file }
});
