import * as React from 'react';
import { ThemeProvider } from '@material-ui/core';
import localforage from 'localforage';

import Window from './Window';
import reducer from '../store/reducer';
import theme from '../theme/theme';
import fileProcessor from '../streaming/fileProcessor';
import { updateSavedSettings } from '../store/actions';
import { IProcessorOptionsContainer, SAVED_SETTINGS_KEY } from '../types';
import getInitialState from '../store/state';
import { StateContext, DispatchContext } from '../contexts/store';

const initState = getInitialState();

const Main = () => {
  /**
   * Set up state for the application
   */
  const [state, dispatch] = React.useReducer(reducer, initState);

  /**
   * Get saved settings objects from
   * local database on initial render.
   */
  React.useEffect(() => {
    localforage.getItem(SAVED_SETTINGS_KEY).then(savedSettings => {
      dispatch(
        updateSavedSettings(savedSettings as IProcessorOptionsContainer)
      );
    });
  }, []);

  /**
   * Whenever the savedSettings slice of state is updated
   * it will automatically be saved to local database.
   */
  React.useEffect(() => {
    localforage.setItem(SAVED_SETTINGS_KEY, state.savedSettings);
  }, [state.savedSettings]);

  /**
   * Handler to start processing file using
   * the current source file and settings.
   */
  const processFile = () =>
    state.sourceFile && fileProcessor(state.sourceFile, state.settings);

  return (
    <ThemeProvider theme={theme}>
      <StateContext.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          <Window processFile={processFile} />
        </DispatchContext.Provider>
      </StateContext.Provider>
    </ThemeProvider>
  );
};

export default Main;
