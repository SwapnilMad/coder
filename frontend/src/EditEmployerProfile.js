import React,{Component} from 'react';
import './App.css';
import axios from 'axios'

class EditEmployerProfile extends Component {
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

        axios.get('http://localhost:8000/api/employer/'+localStorage.getItem('emp_user'),  {
            headers: {
                'Content-Type': 'application/json',
             }
          }).then(res => {
              console.log(localStorage.getItem('emp_user'),res.data)
            if(res.data!=null){
                this.setState({
                    company_name:res.data.emp_fname,
                    emp_full_name:res.data.emp_lname,
                    emp_email: res.data.emp_email_id,
                    emp_address:res.data.emp_address,
                    emp_contact_no:res.data.emp_contact_no,
                    emp_pwd: res.data.emp_pwd,
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
            emp_name:this.state.company_name,
            emp_pwd:this.state.hashpwd,
            emp_full_name:this.state.emp_full_name,
            emp_email_id:this.state.emp_email,
            emp_address:this.state.emp_address,
            emp_contact_no:this.state.emp_contact_no
        });
            
        axios.put('http://localhost:8000/api/employer/'+this.state.emp_email,  data ,  {
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
            <div id="main">
                <div className="signup_form">
                    <h1>
                            Update Details
                    </h1>
                    <form onSubmit={this.handleSubmit}>  
                        <input type="text" value={this.state.company_name} id="company_name" onChange={this.handleChange} className="text_signup" placeholder="Enter Company Name"/>
                        <br />
                        <input type="text" value={this.state.emp_full_name} id="emp_full_name" onChange={this.handleChange} className="text_signup" placeholder="Enter Employer's Full Name"/>
                        <br />
                        <input type="text" value={this.state.emp_contact_no} id="emp_contact_no" onChange={this.handleChange} className="text_signup" placeholder="Enter Contact Number"/>
                        <br />
                        <input type="text" value={this.state.emp_email} id="emp_email" onChange={this.handleChange} className="text_signup" placeholder="Enter Primary Email"/>
                        <br />
                        <input type="text" value={this.state.emp_address} id="emp_address" onChange={this.handleChange} className="text_signup" placeholder="Enter Company Address"/>
                        <br />
                        <input type="password" value={this.state.emp_pwd} id="emp_pwd" onChange={this.hashPassword} className="text_signup" placeholder="Enter Password"/>
                        <br />
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

export default EditEmployerProfile;