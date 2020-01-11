export interface State {
  sourceFile?: File;
  sourceData: SourceHeader[];
  timestamp: number;
  settings: IProcessorOptions;
  savedSettings: IProcessorOptionsContainer;
}

export interface IProcessorOptionsContainer {
  [key: string]: IProcessorOptions;
}

export interface IProcessorOptions {
  columns: Column[];
  filters: IFilter[];
  filterGroups: { [key: string]: string[] };
  transforms: ITransform[];
}

export interface SourceHeader {
  index: number;
  sample: string;
}

export interface Action {
  type: string;
  payload?: any;
}

export type Reducer = (state: State, action: Action) => State;

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
  UPDATE_COLNAME = 'UPDATE_COLNAME',
  SET_FROM_SAVED = 'SET_FROM_SAVED',
  SAVE_SETTINGS = 'SAVE_SETTINGS',
  REMOVE_SETTINGS = 'REMOVE_SETTINGS',
  UPDATE_SAVED_SETTINGS = 'UPDATE_SETTINGS',
  ADD_FILTER = 'ADD_FILTER',
  REMOVE_FILTER = 'REMOVE_FILTER',
  MAKE_FILTER_GROUP = 'MAKE_FILTER_GROUP'
}

export interface IFilter {
  id: string;
  fn: string;
  attr: string;
  val?: string;
}

export interface ITransform {
  fn: string;
  attr: string;
}

export interface IFilterSet {
  [key: string]: (a: any, b?: any) => boolean;
}

export interface ITransformSet {
  [key: string]: (a: string) => string;
}

export const SAVED_SETTINGS_KEY = 'SAVED_SETTINGS_KEY';
