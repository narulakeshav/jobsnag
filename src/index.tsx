/**
 * External Dependencies
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Internal Dependencies
 */
import App from './components/App';
// eslint-disable-next-line
import './reset.css.js';

// DOM
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
