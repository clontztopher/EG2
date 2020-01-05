import * as React from 'react';
import { Action, State } from '../types';
import initializeState from '../store/state';

export const StateContext = React.createContext<State>(initializeState());
export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {}
);
