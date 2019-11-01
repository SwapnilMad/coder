import React,{Component} from 'react';
import './PostJobs.css';
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
    constructor(props) {
        super(props);
    
        this.state = {
            title:'',
            designation:'',
            expirydate:'',
            description:''
        };
    }

    handleChange = event => {
        this.setState({
          [event.target.name]: event.target.value
        });
    }
    handleSubmit=e=>{
        e.preventDefault();
        let date=new Date();
        let date_created=date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()
        let data=JSON.stringify({
          title:this.state.title,
          designation:this.state.designation,
          date_created:date_created,
          expiry_date:this.state.expirydate,
          e_id:localStorage.getItem('emp_id'),
          description:this.state.description
        });

        axios.post('http://localhost:8000/api/jobs',  data ,  {
        headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert('Job added')
        }).catch(function (error) {
            console.log(error);
        })
    }

    render(){
        return(
            <div className="signup_form">
                <h1>Please Enter Details</h1>
                <form  onSubmit={this.handleSubmit}>
                    <div className="jobgrid">
                        <p>Job Title</p>
                        <input type="text" onChange={this.handleChange} name="title" className="Job Title text_signup" placeholder="Enter Job Title"/>
                        <p>Designation:</p> 
                        <input type="text" name="designation" onChange={this.handleChange} className="companyName text_signup" placeholder="Enter Company Name "/>
                        <p>Expiry:</p>
                        <input type="date" name="expirydate" onChange={this.handleChange} placeholder="Enter Job Location or Address"/>
                        <p>Job Description:</p>
                        <textarea rows="3" cols="40" onChange={this.handleChange} name="description" defaultValue="" />
                                
                    </div>
                    <center>
                        <input type="submit" value="Post" className="signUpbtn"/>
                    </center>    
                </form> 
            </div>


        );
    }
}

export default PostJobs;