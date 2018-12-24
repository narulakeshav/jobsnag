/**
 * External Dependencies
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

/**
 * Internal Dependencies
 */
import App from './components/App';
import './reset.css.js';

// Render in DOM
ReactDOM.render(
  <App />,
  document.getElementById('root') as HTMLElement
);
