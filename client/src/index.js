import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import 'semantic-ui-css/semantic.min.css';
import {injectGlobal} from 'styled-components';
import './styles/index.css';

injectGlobal`
  html, body {
    background-color: black;
    background-size: cover;
    width: 100%;
    height: 100vh;
  }
`


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
