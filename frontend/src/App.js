import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import history from './history';

class App extends Component {
  render() {
    return (
      <div>
        <Login />
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

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flag:false,
      fname:"",
      lname:"",
      uname:"",
      email: "",
      address:"",
      contact:"",
      pwd: "",
      hashpwd:"",
      gender:"",
      resume:"",
      profileImage:""
    };
  }

  validateForm() {
    return this.state.flag && this.state.uname.length > 0 && this.state.email.length > 0 && this.state.pwd.length > 0 && this.state.fname.length > 0 && this.state.lname.length > 0 && this.state.contact > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  hashPassword = event => {
    var crypto = require('crypto');
    var name = event.target.value;
    var hash = crypto.createHash('md5').update(name).digest('hex');
    this.setState({
      [event.target.id]: event.target.value,
      hashpwd: hash
    });
  }

  UserNameCheck = event => {
    axios.get('http://localhost:8000/api/candidate/'+this.state.uname,  {
      headers: {
          'Content-Type': 'application/json',
       }
    }).then(res => {
      if(res.data==null){
        this.setState({
          flag:true
        })
      }else{
        console.log(res.data)
        alert("Username already exists");
        this.setState({
          flag:false
        })
      }
        
      }).catch(function (error) {
        console.log(error)
      })      
  }

  uploadImage=event=>{
    const fd =new FormData();
    fd.append('image',event.target.files[0],event.target.files[0].name)
    this.setState({
      profileImage:fd
    })
  }

  handleSubmit = event => {
    event.preventDefault();
    let data=JSON.stringify({
      cand_UName:this.state.uname,
      cand_pwd:this.state.hashpwd,
      cand_FName:this.state.fname,
      cand_LName:this.state.lname,
      cand_EMail_ID:this.state.email,
      cand_Gender:this.state.gender,
      cand_Address:this.state.address,
      cand_Contact_No:this.state.contact,
      resume:this.state.resume
    });

    axios.post('http://localhost:8000/api/candidate/image/'+this.state.uname,this.state.profileImage)
    .then(res=>{
      axios.post('http://localhost:8000/api/candidate',  data ,  {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        alert("Updated")
      }).catch(function (error) {
        console.log(error);
      })
    }).catch(function (error) {
      alert('Please upload valid jpeg,jpg or png file')
    })              
  }
  render(){
    return(
      <div className="signup_form">
            <h1>
                Join Now 
            </h1>
            <form onSubmit={this.handleSubmit}>  
              <input type="text" id="fname" className="FirstName text_signup" onChange={this.handleChange} placeholder="Enter First Name"/>
              <br />
              <input type="text" id="lname" className="LastName text_signup" onChange={this.handleChange} placeholder="Enter last Name"/>
              <br />
              <input type="text" id="contact" className="ContactNo text_signup" onChange={this.handleChange} placeholder="Enter Phone Number"/>
              <br />
              <input type="email" id="email" className="Email_signup text_signup" onChange={this.handleChange} placeholder="Enter Email Address"/>
              <br />
              <input type="text" id="uname" className="ContactNo text_signup" onChange={this.handleChange} onBlur={this.UserNameCheck} placeholder="Enter User Name"/>
              <br />
              <input type="password" id="pwd" className="Password_signup text_signup" onChange={this.hashPassword} placeholder="Password"/>
              <br />
              <input type="file" onChange={this.uploadImage} className="Password_signup text_signup" placeholder="Please Choose Profile Image"/>
              <br />
              <input type="submit" value="Sign Up" disabled={!this.validateForm()} id="signUpbtn"/>
              <br />
              <br />
             </form> 
          </div>
    );
  }
}
class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uname: "",
      password: ""
    };
  }

  validateForm=e=> {
    return this.state.uname.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log('calling handle submit '+this.state.uname)
    axios.get('http://localhost:8000/api/candidate/'+this.state.uname,  {
      headers: {
          'Content-Type': 'application/json',
        //  "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
       //   'Access-Control-Allow-Origin':'*',
        //  "access-control-allow-origin":"*",
        //  "Access-Control-Allow-Credentials": "true",
        //  "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
      }
  })
    .then(res => {
      console.log(res)
      var crypto = require('crypto');
      var hash = crypto.createHash('md5').update(this.state.password).digest('hex');
      if(hash===res.data.cand_pwd){
        localStorage.setItem('user', this.state.uname);
        history.push("/cand/home");
      }
      else{
        alert("Invalid creds");
      }
    }).catch(function (error) {
      console.log(error)
    })
  }

  render(){
    return(
      <div id="header">
        <div className="grid-container">
          <div className="grid-item left">CoderConnect</div>
          <div className="grid-item right">
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.handleChange} id="uname" name="uname" placeholder="Email or Phone Number"/>
            <input type="password" onChange={this.handleChange} id="password" name="password" placeholder="Password"/>
            <input type="submit" value="Sign In" id="signbtn" disabled={!this.validateForm()}/>
            <a href="#" id="forgot_pass">Forgot password?</a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(App);
