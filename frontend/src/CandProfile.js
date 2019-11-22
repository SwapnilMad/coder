import React,{Component} from 'react';
import axios from 'axios'
import './CandProfile.css';

class CandProfile extends Component {

    constructor(props){
        super(props);

        this.state={
            fname:'',
            lname:'',
            image:'',
            designation:'',
            experience:'',
            education:'',
        }
let c=0;
        axios.get('http://localhost:8000/api/candidate/id/'+props.match.params.id,  {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res=>{
            this.setState({
                fname:res.data.cand_fname,
                lname:res.data.cand_lname,
                image:res.data.image_file,
            })      
        })
        let eduarray=[]
        axios.get('http://localhost:8000/api/candidate/education/'+props.match.params.id,  {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res=>{
            res.data.forEach(element => {
                eduarray.push(<div key={c++} className="grid-item">
                    <h2>{element.institution_name}</h2>
                    <h4>{element.level_of_study}</h4>
                    <h6>{element.from_date.split('-')[0]+' - '+element.to_date.split('-')[0]}</h6>
                </div>)
            })
            this.setState({
                education:eduarray
            })
        })    

        let emparray=[]
        axios.get('http://localhost:8000/api/candidate/employment/'+props.match.params.id,  {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res=>{
            res.data.forEach(element => {
                emparray.push(<div key={c++} className="grid-item">
                    <h2>{element.company_name}</h2>
                    <h4>{element.designation}</h4>
                    <h6>{element.from_date.split('-')[0]+' - '+element.to_date.split('-')[0]}</h6>
                </div>)
            })
            this.setState({
                experience:emparray
            })
        })    

    }


    render() {
        return(
            <div className="content mainbody">
                    <div className="grid-container-profile">
                        <div className="grid-item grid-item1">
                          <img className="profile_img" src={'../../candidateImage/'+this.state.image} align="right"/>
                        </div>
                        <div className="grid-item">
                            <h2>{this.state.fname} {this.state.lname}</h2>
                            <h4>Software Developer Front and Back end</h4>
                        </div>
                    </div>
         <br />
        <br />
    
    
            <div className="experience">
    
                <h1>EXPERIENCE</h1>
    
                <div className="expe">
                    <div className="profile-grid">
                        {this.state.experience}
                    </div>
                </div>
            </div>
        <br />
        <br />
    
            <div className="experience">
    
                <h1>Education</h1>
    
                <div className="expe">
                    <div className="profile-grid">
                        {this.state.education}
                    </div>
                </div>
            </div>
    
            <br />
            <br />
    
            <div className="experience">
    
                <h1>PROJECT</h1>
    
                <div className="expe">
                    <div className="profile-grid">
                        <div className="grid-item">
                              <h2>Project name</h2>
                            <h4>date</h4>
                            <p>project done</p>
                        </div>
                    </div>
                </div>
            </div>
        <br />
        <br />
    
        <div className="about">
            <h1>About</h1>
            <table >
                <tbody>
              <tr>
                <td>WHAT I DO</td>
                <td>description</td> 
              </tr>
              <tr>
                <td>SKILL</td>
                <td>description</td>
              </tr>
              <tr>
                <td>ACHIEVEMENTS</td>
                <td>description</td>
              </tr>
              <tr>
                <td>WHAT I'M LOCKING FOR</td>
                <td>description</td>
              </tr>
              </tbody>
            </table>
        </div>
    </div>
        );
    }
}
    
export default CandProfile;