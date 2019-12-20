import React,{Component} from 'react';
import axios from 'axios'
import './CandProfile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
            follow:false,
            f_id:props.match.params.id,
            followvalue:''
        }
        let c=0;
        let data=JSON.stringify({
            f_id:this.state.f_id
          });
        axios.put('http://localhost:8000/api/candidate/follow/'+localStorage.getItem('id'),data,  {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res=>{
            if(res.data.length>0){
                this.setState({
                    follow:true
                })
            }
        })
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

    data=()=>{
        if(this.state.follow){
            return "Following"
        }else{
            return "Follow"
        }
    }

    follow=e=>{
        let data=JSON.stringify({
            f_id:this.state.f_id
        });
        console.log(this.refs,data)
        if(this.state.follow){
            axios.delete('http://localhost:8000/api/candidate/follow/remove/'+localStorage.getItem('id')+'/'+this.state.f_id,  {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res=>{
               // e.target.value="Follow" 
               this.refs.follow.value="Follow"
               this.setState({
                   follow:false
               })
            })
        }else{
            axios.post('http://localhost:8000/api/candidate/follow/'+localStorage.getItem('id'),data,  {
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res=>{
                this.refs.follow.value="Following"   
                this.setState({
                    follow:true
                })
            })
        }
    }


    render() {
        return(
            <div className="content mainbody">
                <input ref="follow" type="button" id="follow" onClick={this.follow} className="btn btn-primary" value={this.data()} />
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