import * as React from 'react';
import { render } from 'react-dom';

import Main from './components/Main';

const appContainer = document.querySelector('#app');

render(<Main />, appContainer);
