import React,{Component} from 'react';
import './App.css';
import axios from 'axios'
import { withRouter } from "react-router-dom";
import history from './history';
import Particles from 'react-particles-js';
import * as js from './resource/particles.json'

class App extends Component {

  constructor(props){
    super(props);
    if(localStorage.getItem('user')){
      history.push("/cand/home")
    }
    console.log('log',js.default)
  }

  render() {
    return (
      <div  >
        
        <Login />
        <Particles canvasClassName="backgroundImg" params={
          js.default
        } />
        <div id="main" className="example alice">
          <Register />
        </div>
        { /* <div id="footer">
          <a href="#" id="forgot_pass">Contact Us</a>
    </div> */}
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
        console.log(res.data)
        this.setState({
          id:res.data
        })
        console.log(this.refs['register'].nextSibling.childNodes[0])
        this.refs['register'].classList.remove('show')
        this.refs['register'].classList.add('hide')
        this.refs['register'].nextSibling.childNodes[0].classList.add('show')
        this.refs['register'].nextSibling.childNodes[0].classList.remove('hide')
      }).catch(function (error) {
        console.log(error);
      })
    }).catch(function (error) {
      alert('Please upload valid jpeg,jpg or png file')
    })              
  }
  render(){
    return(
      <div>
      <div ref='register' id='register' className="signup_form show">
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
              <input type="submit" value="Sign Up" disabled={!this.validateForm()} className="signUpbtn"/>
              <br />
              <br />
             </form> 
          </div>
          <Education id={this.state.id} uname={this.state.uname} />

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
      var crypto = require('crypto');
      var hash = crypto.createHash('md5').update(this.state.password).digest('hex');
      if(res.data&&hash===res.data.cand_pwd){
        localStorage.setItem('user', this.state.uname);
        localStorage.setItem('id', res.data.cand_id);
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
            <ul className="loginnav">
                <li><div>CoderConnect</div></li>
                <form onSubmit={this.handleSubmit}>
                <li><a href="#" id="forgot_pass">Forgot password?</a></li>
                <li><input type="submit" value="Sign In" id="signbtn" disabled={!this.validateForm()}/></li>
                <li><input type="password" onChange={this.handleChange} id="password" name="password" placeholder="Password"/></li>
                <li><input type="text" onChange={this.handleChange} id="uname" name="uname" placeholder="Email or Phone Number"/></li>
                </form>
            </ul>
    );
  }
}

class Education extends Component {
  constructor(props) {
    super(props);
    this.state = {
      institute:'',
      level:'',
      fromdate:'',
      todate:'',
      count:0,
      data:''
    };
  }

  
  addData=e=> {
    this.state.count++;
    this.refs['edudata'].innerHTML=this.refs['edudata'].innerHTML+"<div>"+this.state.count+"</div><div>"+this.state.institute+"</div><div>"+this.state.level+"</div><div>"+this.state.fromdate+"</div><div>"+this.state.todate+"</div>"      
    let oldval=''
    if(this.state.data){
      oldval=this.state.data.concat(',')
    }
    let newval=JSON.stringify({
      cand_id:this.props.id,
      cand_institute:this.state.institute,
      cand_level:this.state.level,
      cand_fromdate:this.state.fromdate,
      cand_todate:this.state.todate,
    });
    this.setState({
      data:oldval.concat(newval)
    })
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit=event=>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/candidate/education',  '['.concat(this.state.data).concat(']') ,  {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        this.refs['education'].classList.remove('show')
        this.refs['education'].classList.add('hide')
        this.refs['education'].nextSibling.classList.add('show')
        this.refs['education'].nextSibling.classList.remove('hide')  
      }).catch(function (error) {
        console.log(error);
      })

  }

  render(){
    return(
      <div>
      <div ref='education' id='education' className="signup_form hide">
        <h1>
          Enter Education 
        </h1>
        <div ref='edudata' className='edugrid'></div>
        <div className="content">
          <form >
            <input type="text" onBlur={this.handleChange} name='institute' className="Institution text_signup" placeholder="Enter Institution Name"/>
            <br />
            <input type="text" name='level' className="LevelOfStudy text_signup" onBlur={this.handleChange} placeholder="Enter Level of Study"/>
            <br />
            From Date&nbsp;<input type="date" name='fromdate' className="FromDate text_signup" onBlur={this.handleChange}/>
            <br />
            To Date&nbsp;<input type="date" name='todate' className="ToDate text_signup" onBlur={this.handleChange}/>
            <br />
            <input type='button' value='Add' onClick={this.addData}/>
            
          </form>
          <br />                         
          <br/>
          <input type='submit' value='Next' className='signUpbtn' onClick={this.handleSubmit}/>
        </div>
      </div>
      <Employment id={this.props.id} uname={this.props.uname}/>
      </div>
    );
  }
}



class Employment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employer:'',
      designation:'',
      fromdate:'',
      todate:'',
      count:0,
      data:''
    };
  }

  
  addData=e=> {
    this.state.count++;
    this.refs['compdata'].innerHTML=this.refs['compdata'].innerHTML+"<div>"+this.state.count+"</div><div>"+this.state.employer+"</div><div>"+this.state.designation+"</div><div>"+this.state.fromdate+"</div><div>"+this.state.todate+"</div>"      
    let oldval=''
    if(this.state.data){
      oldval=this.state.data.concat(',')
    }
    let newval=JSON.stringify({
      cand_id:this.props.id,
      employer:this.state.employer,
      designation:this.state.designation,
      emp_fromdate:this.state.fromdate,
      emp_todate:this.state.todate,
    });
    this.setState({
      data:oldval.concat(newval)
    })
  }

  handleChange = event => {
    console.log(event.target.name,event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
    console.log(this.state)
  }

  handleSubmit=event=>{
    event.preventDefault();
    axios.post('http://localhost:8000/api/candidate/employment',  '['.concat(this.state.data).concat(']') ,  {
        headers: {
            'Content-Type': 'application/json'
        }
      })
      .then(res => {
        localStorage.setItem('user', this.props.uname);
        localStorage.setItem('id', this.props.id);
        history.push("/cand/home");
      }).catch(function (error) {
        console.log(error);
      })
  }

  render(){
    return(
      <div ref='employment' id='employment' className="signup_form hide">
        <h1>
          Enter Employment Details
        </h1>
        <div ref='compdata' className='compgrid'></div>
        <div className="content">
          <form >
            <input type="text" onChange={this.handleChange} name='employer' className="Institution text_signup" placeholder="Enter Employers Name"/>
            <br />
            <input type="text" name='designation' className="LevelOfStudy text_signup" onChange={this.handleChange} placeholder="Enter Designation"/>
            <br />
            From Date&nbsp;<input type="date" name='fromdate' className="FromDate text_signup" onChange={this.handleChange}/>
            <br />
            To Date&nbsp;<input type="date" name='todate' className="ToDate text_signup" onChange={this.handleChange}/>
            <br />
            <input type='button' value='Add' onClick={this.addData}/>
            
          </form>
          <br />                         
          <br/>
          <input type='submit' value='Submit' className='signUpbtn' onClick={this.handleSubmit}/>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
