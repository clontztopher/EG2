import { ActionTypes, ColumnTypes, Reducer, State } from '../types';

const reducer: Reducer = (state, action): State => {
  switch (action.type) {
    case ActionTypes.SET_SOURCE: {
      const { file, data } = action.payload;

      /**
       * Create columns based on number in sample
       * and copy over any existing columns.
       */
      const columns = [];
      const sample = data[0];
      for (let i = 0; i < sample.length; i++) {
        if (
          state.settings.columns.length > 0 &&
          state.settings.columns[i].type != ColumnTypes.IGNORE
        ) {
          columns.push(state.settings.columns[i]);
        } else {
          columns.push({
            type: ColumnTypes.IGNORE,
            name: `Col ${i}`,
            index: i
          });
        }
      }

      return {
        ...state,
        sourceFile: file,
        sourceSample: data,
        addedDate: new Date(),
        settings: {
          ...state.settings,
          columns
        }
      };
    }
    case ActionTypes.UPDATE_COLTYPE: {
      const { idx, type } = action.payload;
      return {
        ...state,
        settings: {
          ...state.settings,
          columns: updateAtIndex(idx, 'type', type, state.settings.columns)
        }
      };
    }
    case ActionTypes.UPDATE_COLNAME: {
      const { idx, name } = action.payload;
      return {
        ...state,
        settings: {
          ...state.settings,
          columns: updateAtIndex(idx, 'name', name, state.settings.columns)
        }
      };
    }
    case ActionTypes.UPDATE_SAVED_SETTINGS: {
      return {
        ...state,
        savedSettings: action.payload.settings
      };
    }
    case ActionTypes.SAVE_SETTINGS: {
      return {
        ...state,
        savedSettings: {
          ...state.savedSettings,
          [action.payload.name]: action.payload.settings
        }
      };
    }
    case ActionTypes.REMOVE_SETTINGS: {
      const savedSettings = { ...state.savedSettings };
      delete savedSettings[action.payload.name];
      return {
        ...state,
        savedSettings
      };
    }
    case ActionTypes.SET_FROM_SAVED: {
      return {
        ...state,
        settings: state.savedSettings[action.payload.name]
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
