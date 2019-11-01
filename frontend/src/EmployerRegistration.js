import React,{Component} from 'react';
import './UpdateProfile.css';
import axios from 'axios'
import history from './history';

class EmployerRegistration extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Login />
                <div id="main">
                    <Register />
                </div>
        { /* <div id="footer">
          <a href="#" id="forgot_pass">Contact Us</a>
    </div> */}
            </div>
        );
    }
}

class Login extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        email_id: "",
        password: ""
      };
    }
  
  
    validateForm=e=> {
      return this.state.email_id.length > 0 && this.state.password.length > 0;
    }
  
    handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }
  
    handleSubmit = event => {
      event.preventDefault();
      axios.get('http://localhost:8000/api/employer/'+this.state.email_id,  {
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
        var crypto = require('crypto');
        var hash = crypto.createHash('md5').update(this.state.password).digest('hex');
        if(res.data&&hash===res.data.emp_pwd){
          localStorage.setItem('emp_user', res.data.emp_email_id);
          localStorage.setItem('emp_id', res.data.emp_id);
          history.push("/emp/home");
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
              <input type="text" onChange={this.handleChange} id="email_id" name="email_id" placeholder="Email or Phone Number"/>
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


  class Register extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        flag:false,
        company_name:"",
        emp_full_name:"",
        emp_email: "",
        address:"",
        emp_contact_no:"",
        emp_pwd: "",
        emp_address: "",
        hashpwd:"",
        profileImage:"",
        id:''
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
      axios.get('http://localhost:8000/api/employer/'+this.state.email_id,  {
        headers: {
            'Content-Type': 'application/json',
         }
      }).then(res => {
        if(res.data==null){
          this.setState({
            flag:true
          })
        }else{
          alert("Email already exists");
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
        emp_name:this.state.company_name,
        emp_pwd:this.state.hashpwd,
        emp_full_name:this.state.emp_full_name,
        emp_email_id:this.state.emp_email,
        emp_address:this.state.emp_address,
        emp_contact_no:this.state.emp_contact_no,
      });
  
      axios.post('http://localhost:8000/api/employer',  data ,  {
        headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            console.log(res.data)
            this.setState({
                id:res.data
            })

            localStorage.setItem('emp_user', this.state.emp_email);
            localStorage.setItem('emp_id', res.data);
            history.push("/emp/home");
        }).catch(function (error) {
            console.log(error);
        })          
    }

    render(){
      return(
        <div id="main">
                <div className="signup_form">
                    <h1>
                       Employer Registration Page
                    </h1>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" id="company_name" onChange={this.handleChange} className="text_signup" placeholder="Enter Company Name"/>
                        <br />
                        <input type="text" id="emp_full_name" onChange={this.handleChange} className="text_signup" placeholder="Enter Employer's Full Name"/>
                        <br />
                        <input type="text" id="emp_contact_no" onChange={this.handleChange} className="text_signup" placeholder="Enter Contact Number"/>
                        <br />
                        <input type="text" id="emp_email" onChange={this.handleChange} className="text_signup" placeholder="Enter Primary Email"/>
                        <br />
                        <input type="text" id="emp_address" onChange={this.handleChange} className="text_signup" placeholder="Enter Company Address"/>
                        <br />
                        <input type="password" id="emp_pwd" onChange={this.hashPassword} className="text_signup" placeholder="Enter Password"/>
                        <br />
                        <br />
                        <input type="submit" value="Sign Up" className="signUpbtn"/>
                        <br />
                        <br />
                    </form>  
                </div>
            </div>
      );
    }
  }

export default EmployerRegistration;