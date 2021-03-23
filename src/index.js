import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

import './index.css';
import Home from './Home';
import LogIn from './components/login/login';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LogIn} />
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
