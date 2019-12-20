import React,{Component} from 'react';
import './App.css';
import axios from 'axios'

class EditProfile extends Component {
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
            password: "",
            hashpwd:"",
            gender:"",
            resume:"",
            profileImage:""
          };

        axios.get('http://localhost:8000/api/candidate/'+localStorage.getItem('user'),  {
            headers: {
                'Content-Type': 'application/json',
             }
          }).then(res => {
              console.log(res.data)
            if(res.data!=null){
                this.setState({
                    fname:res.data.cand_fname,
                    lname:res.data.cand_lname,
                    uname:res.data.cand_uname,
                    hashpwd:res.data.cand_pwd,
                    email: res.data.cand_email_id,
                    address:res.data.cand_address,
                    contact:res.data.cand_contact_no,
                    gender:res.data.cand_gender,
                });
            }
              
            }).catch(function (error) {
              console.log(error)
            })
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
    
    
    
      uploadImage=event=>{
        const fd =new FormData();
        fd.append('image',event.target.files[0],event.target.files[0].name)
        this.setState({
          profileImage:fd
        })
      }

      back=e=>{
        window.history.back();
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
            
        axios.put('http://localhost:8000/api/candidate/'+this.state.uname,  data ,  {
          headers: {
              'Content-Type': 'application/json'
          }
        })
        .then(res => {
          alert("Updated")
        }).catch(function (error) {
          console.log(error);
        })                     
      }
    render() {
        return(
            <div className="maincolor" id="main">
                <div className="signup_form">
                    <h1>
                            Update Details
                    </h1>
                    <form onSubmit={this.handleSubmit}>  
                        Change First Name &nbsp;<input type="text" value={this.state.fname} id="fname" className="FirstName text_signup" onChange={this.handleChange} placeholder="Enter First Name"/>
                        <br />
                        Change Last Name &nbsp;<input type="text" value={this.state.lname} id="lname" className="LastName text_signup" onChange={this.handleChange} placeholder="Enter last Name"/>
                        <br />
                        Change Contact &nbsp;<input type="text" value={this.state.contact} id="contact" className="ContactNo text_signup" onChange={this.handleChange} placeholder="Enter Phone Number"/>
                        <br />
                        Change Email &nbsp;<input type="email" value={this.state.email} id="email" className="Email_signup text_signup" onChange={this.handleChange} placeholder="Enter Email Address"/>
                        <br />
                        <br />
                        Change Password &nbsp;<input type="password" value={this.state.hashpwd} id="password" className="Password_signup text_signup" onChange={this.hashPassword} placeholder="Password"/>
                        <br />
                        <input type="submit" value="Save" id="signUpbtn"/>
                        <input type="button" value="cancel" id="cancel" onClick={this.back}/>
                        <br />
                        <br />
                    </form> 
                    <br />
                    <br />                   
                </div>
            </div>
        );
    }
}

export default EditProfile;