import { State } from '../types';

const getInitialState = (): State => ({
  sourceFile: undefined,
  sourceData: [],
  timestamp: Date.now(),
  settings: {
    columns: [],
    filters: [],
    filterGroups: {},
    transforms: []
  },
  savedSettings: {}
});

export default getInitialState;
