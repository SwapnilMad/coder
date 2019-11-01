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

    deleteaccount(){
        let r=window.confirm("Are you sure you want to delete your profile")
        if(r==true){
          axios.delete('http://localhost:8000/api/employer/'+localStorage.getItem('emp_user'),  {
            headers: {
              'Content-Type': 'application/json',
            }
          }).then(res=>{
            alert('Account Deleted')
            localStorage.removeItem('emp_user');
            localStorage.removeItem('emp_id');
            history.push('/empregister');
          }).catch(function (error) {
            console.log(error)
          });
        }
      }

    render(){
        return(
            <div className="signup_form">
                    <a href="edit" id="homePageLink"> Edit Profile Details</a>
                    <br></br>
                    <br></br>
                    <a href="editjobpost" id="homePageLink"> Edit Job post</a>
                    <br></br>
                    <br></br>
                    <a href="#" id="homePageLink">Update Subscriptions</a>
                    <br></br>
                    <br></br>
                    <a href="#" onClick={this.deleteaccount} id="homePageLink">Delete Account</a>
                    <br></br>
            </div>

        );
    }

}

export default EmployerProfile;