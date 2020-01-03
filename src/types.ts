export interface State {
	sourceFile?: File;
	addedDate: Date;
	columns: Column[];
	filters: IFilter[][];
	transforms: ITransform[];
}

export enum ColumnTypes {
	IGNORE = 'IGNORE',
	DATE = 'DATE',
	EMAIL = 'EMAIL',
	NUMBER = 'NUMBER',
	STRING = 'STRING'
}

export interface Column {
	index: number;
	type: ColumnTypes;
	name: string;
}

export enum ActionTypes {
	SET_SOURCE = 'SET_SOURCE',
	UPDATE_COLTYPE = 'UPDATE_COLTYPE',
	UPDATE_COLNAME = 'UPDATE_COLNAME'
}

export interface IFilter {
	fn: string;
	attr: string;
	val?: string;
}

export interface ITransform {
	fn: string;
	attr: string;
}

export interface IProcessorOptions {
	columns: Column[];
	filters: IFilter[][];
	transforms: ITransform[];
}

export interface IFilterSet {
	[key: string]: (a: any, b?: any) => boolean;
}

export interface ITransformSet {
	[key: string]: (a: string) => string;
}
