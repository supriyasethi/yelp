import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import LoginPage from './LoginPageCustomer/LoginPage';
import SignupPage from './SignupPageCustomer/SignupPage';
import * as serviceWorker from './serviceWorker';
import 'bulma/css/bulma.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
