/** Fetch **/
import 'whatwg-fetch'
/** CSS **/
import 'semantic-ui-css/semantic.css'
import './_styles/index.css';
/** React **/
import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment'
import App from './App';
import configureStore from './store/configureStore.js'
/** Moment */
moment.locale('es');
/** Redux Store **/
const store = configureStore()
/** Render **/
const rootEl = document.getElementById('root')
ReactDOM.render(
  <App store={store} />,
  rootEl
);
/** HMR */
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.render(
      <NextApp />,
      rootEl
    );
  });
}