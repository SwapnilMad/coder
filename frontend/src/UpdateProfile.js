import React,{Component} from 'react';
import './UpdateProfile.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";

class UpdateProfile extends Component {
    render() {
      return (
        <div>
        
<div id="main">
<div className="signup_form">
    <a href="edit" id="homePageLink"> Edit Profile Details</a>
    <br />
    <br />
    <a href="#" id="homePageLink"> Edit Resume</a>
    <br />
    <br />
    <a href="#" id="homePageLink">Update Subscriptions</a>
    <br />
    <br />
    <a href="#" id="homePageLink">Update Password</a>
    <br />
    <br />
    <a href="#" id="homePageLink">Delete Account</a>
    <br />

                        
    
</div>

</div>
<div id="footer">
<a href="#" id="forgot_pass">Contact Us</a>
</div>
        </div>
      );
    }
  }

  export default UpdateProfile;