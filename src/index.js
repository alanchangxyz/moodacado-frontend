import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CookiesProvider } from "react-cookie";

import './index.css';
import Home from './Home';
import LogIn from './components/login/login';
import Dashboard from './components/dashboard/Dashboard';

ReactDOM.render(
  <React.StrictMode>
    <CookiesProvider>
      <Router>
        <Route path="/" component={Home} exact />
        <Route path="/login" component={LogIn} />
        <Route path="/dashboard" component={Dashboard} exact />
      </Router>
    </CookiesProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
