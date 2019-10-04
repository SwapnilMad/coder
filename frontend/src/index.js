import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom'
import './index.css';
import App from './App';
import CandidateHome from './CandidateHome';
import Nav from './Nav';
import UpdateProfile from './UpdateProfile';
import EditProfile from './EditProfile';
import * as serviceWorker from './serviceWorker';
import history from './history';

const routing = (
    <Router history={history} >
      <div>
        <Route exact path="/" component={App} />
        <Route path="/cand" component={Nav} />
        <Route path="/cand/home" component={CandidateHome} />
        <Route path="/cand/update" component={UpdateProfile} />
        <Route path="/cand/edit" component={EditProfile} />
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

