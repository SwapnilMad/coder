import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import history from './history';

class EmployerProfile extends Component{
    render(){
        return(
        <div>
          <div id="main">
          <Profile />
          </div>
          <div id="footer">
          <a href="#" id="forgot_pass">Contact Us</a>
        </div>
      </div>
            
        );
    }
}

class Profile extends Component{
    render(){
        return(
            <div class="signup_form">
                    <a href="edit" id="homePageLink"> Edit Profile Details</a>
                    <br></br>
                    <br></br>
                    <a href="jobpost" id="homePageLink"> Edit Job post</a>
                    <br></br>
                    <br></br>
                    <a href="#" id="homePageLink">Update Subscriptions</a>
                    <br></br>
                    <br></br>
                    <a href="#" id="homePageLink">Update Password</a>
                    <br></br>
                    <br></br>
                    <a href="#" id="homePageLink">Delete Account</a>
                    <br></br>
            </div>

        );
    }

}

export default EmployerProfile;