import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import history from './history';



class EmployerHome extends Component{
    render() {
        return(
        <div>
        <div id="header" />
        <Header></Header>
          <div id="main">
          <Register />
          </div>
          <div id="footer">
          <a href="#" id="forgot_pass">Contact Us</a>
        </div>
      </div>
        );


    }

}

class Header extends Component{
    render() {
        return(
        <div class="grid-container">
            <div class="grid-item left">CoderConnect</div>
            <div class="grid-item right">
                <a href="EmployerHome.html" id="homePageLink"> Home</a>
                <a href="Employerprofile.html" id="homePageLink"> Update profile Details</a>
                <a href="#" id="homePageLink"> Post Jobs</a>
                 <a href="#" id="homePageLink">Search Candidate</a>
                <a href="#" id="homePageLink"> Logout</a>
            </div>
        </div>
        );

    }
}