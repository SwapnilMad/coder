import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import history from './history';


class ProfileDetailsEmployer extends Component{
    render(){
        return(
            <div>
            <div id="header" />
            <Header></Header>
              <div id="main">
              <Details />
              </div>
              <div id="footer">
              <a href="#" id="forgot_pass">Contact Us</a>
            </div>
          </div>
        );
    }

}

class Header extends Component{
    render(){
        return(
            <div class="grid-container">
                        <div class="grid-item left">Update Profile</div>
                        <div class="grid-item right">
                            <a href="EmployerHome.html" id="homePageLink"> Home</a>
                            <a href="Employerprofile.html" id="homePageLink"> Update profile Details</a>
                            <a href="#" id="homePageLink"> Search Candidate</a>          
                            <a href="#" id="homePageLink"> Logout</a>
                        </div>
                </div>

        );
    }
}

class Details extends Component{
    render(){
        return(
            <div class="signup_form">
                <h1>Please Enter Details</h1>
                    Company Name:    
                    <input type="text" name="companyName" class="companyName text_signup" placeholder="Enter Company Name "/>
                    <br></br>
                    Job Title:&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" name="jobTitle" class="Job Title text_signup" placeholder="Enter Job Title"/>
                    <br></br>
                    Location:&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" name="jobLocation" placeholder="Enter Job Location or Address"/>
                    <br></br>
                    <br></br>
                    Job Description:
                    <textarea rows="3" cols="40"> </textarea>
                    <br><br> </br> </br>
                    <center>
                    <input type="button" value="Cancel" class="cancel"/>
                    <input type="button" value="Post" class="Post"/>
                    </center>              
                    
            </div>


        );
    }
}