import produce from 'immer';
import { ActionTypes, Reducer, State, Action } from '../types';

const reducer: Reducer = produce((draft: State, action: Action) => {
  switch (action.type) {
    case ActionTypes.SET_SOURCE: {
      const { file, data } = action.payload;

      draft.sourceFile = file;

      draft.sourceData = data[0].map((val: string, i: number) => ({
        index: i,
        sample: val
      }));

      draft.timestamp = Date.now();
      break;
    }

    case ActionTypes.UPDATE_COLTYPE: {
      const { id, type } = action.payload;

      draft.settings.columns[id].type = type;
      break;
    }

    case ActionTypes.UPDATE_COLNAME: {
      const { id, name } = action.payload;

      draft.settings.columns[id].name = name;
      break;
    }

    case ActionTypes.UPDATE_SAVED_SETTINGS: {
      draft.savedSettings = action.payload.settings;
      break;
    }

    case ActionTypes.SAVE_SETTINGS: {
      const { name, settings } = action.payload;

      draft.savedSettings[name] = settings;
      break;
    }

    case ActionTypes.REMOVE_SETTINGS: {
      const { name } = action.payload;

      delete draft.savedSettings[name];
      break;
    }

    case ActionTypes.SET_FROM_SAVED: {
      const { name } = action.payload;

      draft.savedSettings[name];
      break;
    }

    /**
     * Groups must have at least one filter so
     * create a new group and filter to populate
     * it with.
     */
    case ActionTypes.MAKE_FILTER_GROUP: {
      const fltr = createFilter();

      draft.settings.filterGroups[makeId()] = [fltr.id];
      draft.settings.filters.push(fltr);
      break;
    }

    /**
     * Filters must belong to a group so
     * the addFilter action must provide
     * a prevously created group id.
     */
    case ActionTypes.ADD_FILTER: {
      const { gid } = action.payload;
      const fltr = createFilter();

      draft.settings.filterGroups[gid].push(fltr.id);
      draft.settings.filters.push(fltr);
      break;
    }

    case ActionTypes.REMOVE_FILTER: {
      const { id } = action.payload;

      // Remove from filters
      draft.settings.filters = draft.settings.filters.filter(f => f.id !== id);

      // Remove from groupps and delete group if empty after removal
      for (let gid in draft.settings.filterGroups) {
        draft.settings.filterGroups[gid] = draft.settings.filterGroups[
          gid
        ].filter(fid => fid !== id);
        if (draft.settings.filterGroups[gid].length === 0) {
          delete draft.settings.filterGroups[gid];
        }
      }
      break;
    }
  }
});

function makeId() {
  return Math.random()
    .toString(16)
    .split('.')[1];
}

function createFilter() {
  return {
    id: makeId(),
    fn: '',
    attr: ''
  };
}

export default reducer;
