import React from 'react';
import {createRoot} from 'react-dom/client'
import {
  Route,
  BrowserRouter as Router,
  Redirect,
  Switch
} from 'react-router-dom'
import './index.css';
import Login from './Pages/Login/Login.jsx';
import Geral from './Pages/Geral/Geral.jsx';
import AdminRoot from './Pages/AdminRoot/AdminRoot.jsx';
import reportWebVitals from './reportWebVitals';

const routing = (
  <Router>
      <div>
        <Switch>
          <Route exact path="/" component={Login}/>
          <Route path="/geral" component={Geral}/>
          <Route path="/admin" component={AdminRoot}/>
        </Switch>
      </div>
  </Router>
)

const root = createRoot(document.getElementById('root'))

root.render(routing);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
