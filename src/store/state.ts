import { State } from '../types';

const getInitialState = (): State => ({
  sourceFile: undefined,
  sourceSample: [[]],
  addedDate: new Date(),
  settings: {
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
  },
  savedSettings: {}
});

export default getInitialState;
