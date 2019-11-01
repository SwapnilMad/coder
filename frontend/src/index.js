import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Router } from 'react-router-dom'
import './index.css';
import App from './App';
import CandidateHome from './CandidateHome';
import Nav from './Nav';
import UpdateProfile from './UpdateProfile';
import EditProfile from './EditProfile';
import EditCandidateEducation from './EditCandidateEducation'
import EditCandidateEmployment from './EditCandidateEmployment'
import EmployerHome from './EmployerHome'
import Employerprofile from './Employerprofile'
import PostJobs from './PostJobs'
import EmpNav from './EmpNav'
import EmployerRegistration from './EmployerRegistration'
import EditEmployerProfile from './EditEmployerProfile'
import * as serviceWorker from './serviceWorker';
import history from './history';
import EditJobPost from './EditJobPost';
import SearchJobs from './SearchJobs';

const routing = (
    <Router history={history} >
      <div>
        <Route exact path="/" component={App} />
        <Route path="/cand" component={Nav} />
        <Route path="/cand/home" component={CandidateHome} />
        <Route  path="/cand/update" component={UpdateProfile} />
        <Route path="/cand/edit" component={EditProfile} />
        <Route path="/cand/editedu" component={EditCandidateEducation} />
        <Route path="/cand/editemp" component={EditCandidateEmployment} />
        <Route path="/cand/searchjobs" component={SearchJobs} />
        <Route path="/emp" component={EmpNav} />
        <Route exat path="/empregister" component={EmployerRegistration} />
        <Route path="/emp/home" component={EmployerHome} />
        <Route path="/emp/update" component={Employerprofile} />
        <Route path="/emp/jobpost" component={PostJobs} />
        <Route path="/emp/editjobpost" component={EditJobPost} />
        <Route path="/emp/edit" component={EditEmployerProfile} />
      </div>
    </Router>
  )
ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

