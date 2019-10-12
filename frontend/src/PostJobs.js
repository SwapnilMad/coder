import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import history from './history';


class PostJobs extends Component{
    render(){
        return(
            <div>
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

class Details extends Component{
    render(){
        return(
            <div className="signup_form">
                <h1>Please Enter Details</h1>
                    Job Title:&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                    <input type="text" name="title" className="Job Title text_signup" placeholder="Enter Job Title"/>
                    <br />
                    Designation:    
                    <input type="text" name="designation" className="companyName text_signup" placeholder="Enter Company Name "/>
                    <br />
                    Expiry:&emsp;&emsp;&nbsp;&nbsp;&nbsp;
                    <input type="date" name="expirydate" placeholder="Enter Job Location or Address"/>
                    <br /><br />
                    Job Description:
                    <textarea rows="3" cols="40"> </textarea>
                    <br /><br />
                    <center>
                    <input type="button" value="Cancel" className="cancel"/>
                    <input type="button" value="Post" className="Post"/>
                    </center>              
                    
            </div>


        );
    }
}

export default PostJobs;