import {
  ColumnTypes,
  ActionTypes,
  IProcessorOptionsContainer,
  IProcessorOptions,
  IFilter
} from '../types';

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

export const updateSavedSettings = (settings: IProcessorOptionsContainer) => ({
  type: ActionTypes.UPDATE_SAVED_SETTINGS,
  payload: { settings }
});

export const saveSettings = (name: string, settings: IProcessorOptions) => ({
  type: ActionTypes.SAVE_SETTINGS,
  payload: { name, settings }
});

export const removeSettings = (name: string) => ({
  type: ActionTypes.REMOVE_SETTINGS,
  payload: { name }
});

export const setFromSaved = (name: string) => ({
  type: ActionTypes.SET_FROM_SAVED,
  payload: { name }
});

export const addFilter = (gid: string) => ({
  type: ActionTypes.ADD_FILTER,
  payload: { gid }
});

export const deleteFilter = (id: string) => ({
  type: ActionTypes.REMOVE_FILTER,
  payload: { id }
});

export const makeFilterGroup = () => ({
  type: ActionTypes.MAKE_FILTER_GROUP
});
