import React,{Component} from 'react';
import './UpdateProfile.css';
import axios from 'axios'
import history from './history';

class UpdateProfile extends Component {

  constructor(props) {
    super(props);
  }

  deleteaccount(){
    let r=window.confirm("Are you sure you want to delete your profile")
    if(r==true){
      axios.delete('http://localhost:8000/api/candidate/'+localStorage.getItem('user'),  {
        headers: {
          'Content-Type': 'application/json',
        }
      }).then(res=>{
        alert('Account Deleted')
        localStorage.removeItem('user');
        history.push('/');
      }).catch(function (error) {
        console.log(error)
      });
    }
  }

    render() {
      return (
        <div>                
          <div id="main">
          <div className="signup_form">
              <a href="edit" > Edit Profile Details</a>
              <br />
              <br />
              <a href="editedu" > Edit Education History</a>
              <br />
              <br />
              <a href="editemp" > Edit Employment History</a>
              <br />
              <br />
              <a href="upres" > Edit Resume</a>
              <br />
              <br />
              <a href="#" >Update Subscriptions</a>
              <br />
              <br />
              <a href="#"  onClick={this.deleteaccount}>Delete Account</a>
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