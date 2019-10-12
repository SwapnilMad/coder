import React,{Component} from 'react';
import './CandidateHome.css';
import axios from 'axios'
import amazon from './resource/feed/imageAmazon.jpg'
import faceb from './resource/feed/imageFacebook.jpg' 
class CandidateHome extends Component {

    constructor(props){
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
                        profileImage:res.data.image_file
                    });
                }
            }).catch(function (error) {
              console.log(error)
            })
    }
    render() {
        return(
            <div id="main">
                <div className="profileimage">
                    <div className="card">
                        <img src={'../candidateImage/'+this.state.profileImage} alt="John" />
                        <h1>{this.state.fname} {this.state.lname}</h1>
                        <p className="title">Senior Developer, CoderConnect</p>
                        <p>Pace University</p>
                    </div>
                </div>
                <div className="jobtiles">
                    <div className="jobcard">
                        <h1>Amazon have New openings</h1>                        
                        <img src={amazon} alt="John" />    
                    </div>
                    <br />
                    <div className="jobcard">
                        <h1>Facebook plans to expand its market</h1>                        
                        <img src={faceb} alt="John" />    
                    </div>

                    <br />
                    <div className="jobcard">
                        <h1>Amazon have New openings</h1>                        
                        <img src={amazon} alt="John" />   
                    </div>               
                </div>
            </div>

        );
    }
}

export default CandidateHome;