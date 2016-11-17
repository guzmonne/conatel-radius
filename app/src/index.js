/** Fetch **/
import 'whatwg-fetch'
/** CSS **/
import 'semantic-ui-css/semantic.css'
import './_styles/index.css';
/** React **/
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './store/configureStore.js'
/** Redux Store **/
const store = configureStore()
/** Render **/
ReactDOM.render(
  <App store={store} />,
  document.getElementById('root')
);
